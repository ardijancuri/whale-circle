// Three.js Particle Whale Animation - From GLTF Model
class WhaleParticles {
    constructor() {
        this.container = document.getElementById('whale-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particlePositions = [];
        this.whaleVertices = [];
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        this.modelLoaded = false;
        this.entranceAnimationTime = 0;
        this.entranceAnimationDuration = 3; // 3 seconds entrance animation

        this.init();
        this.loadWhaleModel();
        this.addEventListeners();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();

        // Camera setup
        const containerHeight = this.container.offsetHeight;
        const containerWidth = this.container.offsetWidth;

        this.camera = new THREE.PerspectiveCamera(
            75,
            containerWidth / containerHeight,
            0.1,
            1000
        );
        // Position camera to see more of the whale's face (angled view)
        // Adjust Y position for mobile to center whale vertically
        const isMobile = window.innerWidth <= 768;
        const cameraY = isMobile ? -10 : 5;
        this.camera.position.set(-60, cameraY, 180);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(containerWidth, containerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Start animation loop
        this.animate();
    }

    loadWhaleModel() {
        const loader = new THREE.GLTFLoader();

        // Show loading message
        console.log('Loading whale model...');

        // Try to load the GLB file (larger, more detailed)
        loader.load(
            'blue_whale_object.glb',
            (gltf) => {
                console.log('Whale model loaded successfully!');
                this.processWhaleModel(gltf);
            },
            (progress) => {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                console.log(`Loading: ${percent}%`);
            },
            (error) => {
                console.error('Error loading GLB, trying GLTF...', error);
                // Fallback to GLTF if GLB fails
                loader.load(
                    'whale-object.gltf',
                    (gltf) => {
                        console.log('Whale GLTF model loaded successfully!');
                        this.processWhaleModel(gltf);
                    },
                    undefined,
                    (error) => {
                        console.error('Error loading whale model:', error);
                    }
                );
            }
        );
    }

    processWhaleModel(gltf) {
        const model = gltf.scene;

        // Extract all vertices from all meshes in the model
        model.traverse((child) => {
            if (child.isMesh) {
                const geometry = child.geometry;

                // Clone geometry to apply any transformations
                const tempGeometry = geometry.clone();
                tempGeometry.applyMatrix4(child.matrixWorld);

                const positions = tempGeometry.attributes.position;

                if (positions) {
                    console.log(`Found mesh with ${positions.count} vertices`);

                    // Extract every vertex
                    for (let i = 0; i < positions.count; i++) {
                        const x = positions.getX(i);
                        const y = positions.getY(i);
                        const z = positions.getZ(i);

                        this.whaleVertices.push({ x, y, z });
                    }

                    // Add MORE surface particles - subdivide triangular surface only
                    if (geometry.index) {
                        const indices = geometry.index.array;

                        // Sample triangles to add particles on the SURFACE ONLY
                        for (let i = 0; i < indices.length; i += 3) {
                            const i1 = indices[i];
                            const i2 = indices[i + 1];
                            const i3 = indices[i + 2];

                            const v1 = new THREE.Vector3(
                                positions.getX(i1),
                                positions.getY(i1),
                                positions.getZ(i1)
                            );
                            const v2 = new THREE.Vector3(
                                positions.getX(i2),
                                positions.getY(i2),
                                positions.getZ(i2)
                            );
                            const v3 = new THREE.Vector3(
                                positions.getX(i3),
                                positions.getY(i3),
                                positions.getZ(i3)
                            );

                            // Subdivide the triangle surface into a grid pattern
                            // This creates more surface particles without filling the interior
                            const subdivisions = 6; // Creates 6x6 grid on each triangle for more definition

                            for (let u = 0; u <= subdivisions; u++) {
                                for (let v = 0; v <= subdivisions - u; v++) {
                                    // Barycentric coordinates for surface points
                                    const a = u / subdivisions;
                                    const b = v / subdivisions;
                                    const c = 1 - a - b;

                                    // Only add if it's a valid point on the triangle surface
                                    if (c >= 0) {
                                        const surfacePoint = new THREE.Vector3()
                                            .addScaledVector(v1, a)
                                            .addScaledVector(v2, b)
                                            .addScaledVector(v3, c);

                                        this.whaleVertices.push({
                                            x: surfacePoint.x,
                                            y: surfacePoint.y,
                                            z: surfacePoint.z
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        console.log(`Total particles created: ${this.whaleVertices.length}`);

        // Calculate bounding box for proper scaling
        this.calculateBoundingBox();

        // Create particles from the extracted vertices
        this.createParticlesFromModel();

        this.modelLoaded = true;
    }

    calculateBoundingBox() {
        if (this.whaleVertices.length === 0) return;

        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        this.whaleVertices.forEach(v => {
            minX = Math.min(minX, v.x);
            minY = Math.min(minY, v.y);
            minZ = Math.min(minZ, v.z);
            maxX = Math.max(maxX, v.x);
            maxY = Math.max(maxY, v.y);
            maxZ = Math.max(maxZ, v.z);
        });

        const sizeX = maxX - minX;
        const sizeY = maxY - minY;
        const sizeZ = maxZ - minZ;
        const maxSize = Math.max(sizeX, sizeY, sizeZ);

        console.log(`Model size: ${sizeX.toFixed(2)} x ${sizeY.toFixed(2)} x ${sizeZ.toFixed(2)}`);

        // Scale and center the vertices - MAKE WHALE ENORMOUS
        // Smaller scale for mobile devices
        const isMobile = window.innerWidth <= 768;
        const baseScale = isMobile ? 250 : 580;
        const scale = baseScale / maxSize;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const centerZ = (minZ + maxZ) / 2;

        this.whaleVertices = this.whaleVertices.map(v => ({
            x: (v.x - centerX) * scale,
            y: (v.y - centerY) * scale,
            z: (v.z - centerZ) * scale
        }));

        console.log('Model scaled and centered');
    }

    createParticlesFromModel() {
        const particleCount = this.whaleVertices.length;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Light blue color with subtle variation based on #70C3F4
        const baseColor = new THREE.Color(0x70C3F4);
        const darkBlue = new THREE.Color(0x5ab0e0);
        const midBlue = new THREE.Color(0x85d0f8);

        for (let i = 0; i < particleCount; i++) {
            const vertex = this.whaleVertices[i];

            positions[i * 3] = vertex.x;
            positions[i * 3 + 1] = vertex.y;
            positions[i * 3 + 2] = vertex.z;

            // Color variation for depth
            let color;
            const rand = Math.random();

            if (rand > 0.93) {
                color = midBlue; // Highlights
            } else if (rand > 0.7) {
                color = darkBlue;
            } else {
                color = baseColor;
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Slightly larger, uniform particle sizes for more definition
            sizes[i] = 0.18 + Math.random() * 0.04; // Range: 0.18 to 0.22

            // Store original positions for animation
            this.particlePositions.push({
                original: { ...vertex },
                offset: {
                    x: (Math.random() - 0.5) * 0.12,
                    y: (Math.random() - 0.5) * 0.12,
                    z: (Math.random() - 0.5) * 0.12
                },
                speed: Math.random() * 0.008 + 0.004
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Material for particles - larger size for more definition
        const material = new THREE.PointsMaterial({
            size: 0.35,
            vertexColors: true,
            transparent: false,
            opacity: 1,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);

        // Initial rotation - angled to show face
        this.particles.rotation.y = Math.PI * 0.35; // ~63 degrees - more face visible
        this.particles.rotation.x = 0;
        this.particles.rotation.z = 0;

        this.scene.add(this.particles);

        console.log('Particle system created successfully!');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.modelLoaded && this.particles) {
            const time = Date.now() * 0.001;
            const positions = this.particles.geometry.attributes.position.array;

            // ENTRANCE ANIMATION - Smooth zoom-in effect only
            if (this.entranceAnimationTime < this.entranceAnimationDuration) {
                this.entranceAnimationTime += 0.016; // ~60fps
                const progress = Math.min(this.entranceAnimationTime / this.entranceAnimationDuration, 1);

                // Smooth ease-out function for very smooth animation
                const easeProgress = 1 - Math.pow(1 - progress, 4);

                // Simple scale zoom from small to normal size
                const startScale = 0.3; // Start small
                const endScale = 1; // End at normal size
                const currentScale = startScale + ((endScale - startScale) * easeProgress);
                this.particles.scale.set(currentScale, currentScale, currentScale);

                // Fade in opacity smoothly
                this.particles.material.opacity = easeProgress;
                this.particles.material.transparent = true;
            } else {
                // After entrance, make fully opaque
                this.particles.material.transparent = false;
                this.particles.material.opacity = 1;
            }

            // BODY WAVE ANIMATION - Create swimming motion
            for (let i = 0; i < this.particlePositions.length; i++) {
                const particleData = this.particlePositions[i];
                const original = particleData.original;
                const offset = particleData.offset;
                const speed = particleData.speed;

                // Calculate normalized position along whale body (0 = head, 1 = tail)
                // Assuming the whale model is oriented with head at negative X, tail at positive X
                const bodyLength = 120; // Approximate based on scale
                const normalizedPosition = (original.x + 60) / bodyLength;
                const clampedPosition = Math.max(0, Math.min(1, normalizedPosition));

                // TAIL WAVE - Creates the classic whale tail-beat swimming motion
                // The wave propagates from head to tail, with increasing amplitude
                const waveSpeed = 1.0; // Speed of the wave
                const waveFrequency = 2.5; // How many waves along the body
                const tailAmplitude = Math.pow(clampedPosition, 2.2) * 6; // Exponential increase toward tail

                // Side-to-side tail movement (in Z axis since whale is sideways)
                const tailWave = Math.sin(time * waveSpeed - clampedPosition * waveFrequency) * tailAmplitude;

                // BODY UNDULATION - Vertical movement along the body
                const bodyUndulation = Math.sin(time * 0.7 + clampedPosition * 1.5) * (1 - clampedPosition * 0.6) * 1.5;

                // Very minimal floating for texture only
                const floatX = Math.sin(time * speed + i * 0.02) * offset.x * 0.2;
                const floatY = Math.cos(time * speed + i * 0.03) * offset.y * 0.2;
                const floatZ = Math.sin(time * speed * 0.5 + i * 0.04) * offset.z * 0.2;

                // Apply all movements
                positions[i * 3] = original.x + floatX; // X stays mostly fixed (body length)
                positions[i * 3 + 1] = original.y + floatY + bodyUndulation; // Y gets vertical undulation
                positions[i * 3 + 2] = original.z + floatZ + tailWave; // Z gets the tail wave (side-to-side)
            }

            // Smooth rotation based on mouse
            this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.03;
            this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.03;

            // SWIMMING ANIMATION - Move the entire whale object

            // 1. Up and down diving motion
            const divingMotion = Math.sin(time * 0.4) * 8;

            // 2. Gentle side-to-side gliding
            const sideGlide = Math.cos(time * 0.3) * 4;

            // 3. Forward/backward depth movement
            const depthMovement = Math.sin(time * 0.35) * 3;

            // 4. Gentle roll (rotation around X axis) - like whale banking
            const rollMotion = Math.sin(time * 0.5) * 0.08;

            // 5. Slight pitch (nose up/down)
            const pitchMotion = Math.sin(time * 0.45) * 0.05;

            // 6. Yaw rocking (turning left/right slightly)
            const yawRocking = Math.sin(time * 0.55) * 0.04;

            // Smooth blend from entrance to swimming animation
            let blendFactor = 1;
            if (this.entranceAnimationTime < this.entranceAnimationDuration) {
                // During entrance, no swimming animations
                blendFactor = 0;
            } else if (this.entranceAnimationTime < this.entranceAnimationDuration + 1) {
                // Smooth 1-second transition after entrance
                const transitionTime = this.entranceAnimationTime - this.entranceAnimationDuration;
                blendFactor = transitionTime; // Linear fade-in over 1 second
            }

            // Apply position movements with blend
            this.particles.position.x = sideGlide * blendFactor;
            this.particles.position.y = divingMotion * blendFactor;
            this.particles.position.z = depthMovement * blendFactor;

            // Apply rotation movements (swimming dynamics) with blend
            // Mouse rotation should always work, only blend the automatic motions
            // For mobile, rotate whale to vertical orientation (head up, tail down) and flip around spine
            const isMobile = window.innerWidth <= 768;
            const baseRotationX = isMobile ? -Math.PI * 0.5 : 0;
            const baseRotationY = isMobile ? 0 : Math.PI * 0.35;
            const baseRotationZ = isMobile ? Math.PI * 0.95 : 0;

            this.particles.rotation.x = baseRotationX + this.currentRotation.x + (pitchMotion * blendFactor);
            this.particles.rotation.y = baseRotationY + this.currentRotation.y + (yawRocking * blendFactor);
            this.particles.rotation.z = baseRotationZ + (rollMotion * blendFactor);

            // Very subtle breathing - only after entrance completes
            if (this.entranceAnimationTime >= this.entranceAnimationDuration) {
                const breathScale = 1 + Math.sin(time * 0.5) * 0.012 * blendFactor;
                this.particles.scale.set(breathScale, breathScale, breathScale);
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        // Mouse move for interactive rotation
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.y = this.mouse.x * 0.5;
            this.targetRotation.x = this.mouse.y * 0.3;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const containerHeight = this.container.offsetHeight;
            const containerWidth = this.container.offsetWidth;

            this.camera.aspect = containerWidth / containerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(containerWidth, containerHeight);
        });

        // Touch support
        window.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

                this.targetRotation.y = this.mouse.x * 0.5;
                this.targetRotation.x = this.mouse.y * 0.3;
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WhaleParticles();
});
