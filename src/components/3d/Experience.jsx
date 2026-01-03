import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, Text, Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import profileImg from '../../assets/image.png';

const HeroImage = () => {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const { viewport } = useThree();

    useFrame((state, delta) => {
        // Subtle breathing
        const time = state.clock.elapsedTime;
        ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, 3.5 * (hovered ? 1.05 : 1), delta * 2);
        ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, 4.5 * (hovered ? 1.05 : 1), delta * 2);

        // Color shift on interaction (Full color vs Slight Desaturation)
        ref.current.material.grayscale = THREE.MathUtils.lerp(ref.current.material.grayscale, hovered ? 0 : 0.2, delta * 3);
        ref.current.material.zoom = THREE.MathUtils.lerp(ref.current.material.zoom, hovered ? 1 : 1.1, delta * 3);
    });

    return (
        <Image
            ref={ref}
            url={profileImg}
            scale={[3.5, 4.5, 1]}
            // Anchor to bottom of viewport
            position={[0, -viewport.height / 2 + 2.25, 0]}
            transparent
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            grayscale={0.2}
            toneMapped={false}
        />
    );
};

const GlassShape = (props) => {
    const mesh = useRef();
    useFrame((state) => {
        mesh.current.rotation.x = state.clock.elapsedTime * props.speed;
        mesh.current.rotation.y = state.clock.elapsedTime * props.speed;
    });

    return (
        <mesh ref={mesh} {...props}>
            <octahedronGeometry args={[props.size || 1, 0]} />
            <meshPhysicalMaterial
                roughness={0}
                transmission={1}
                thickness={2}
                ior={1.5}
                chromaticAberration={0.1}
                color="#fff"
            />
        </mesh>
    );
};

const Experience = () => {
    const { viewport } = useThree();

    useFrame(({ mouse, camera }) => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 1, 0.05);
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <color attach="background" args={['#050505']} />

            {/* VIBRANT STUDIO LIGHTING */}
            <ambientLight intensity={0.2} />

            {/* Key Light (Neon Pink) */}
            <spotLight
                position={[-5, 5, 5]}
                intensity={200}
                color="#ff00cc"
                angle={0.5}
                penumbra={1}
                distance={20}
            />

            {/* Fill Light (Cyber Cyan) */}
            <spotLight
                position={[5, 1, 5]}
                intensity={200}
                color="#00ffff"
                angle={0.5}
                penumbra={1}
                distance={20}
            />

            {/* Back Light (White Rim) */}
            <spotLight position={[0, 5, -5]} intensity={50} color="white" />

            {/* ATMOSPHERE */}
            <Stars radius={50} count={2000} factor={3} fade speed={1} />
            <Sparkles count={40} scale={10} size={4} speed={0.4} opacity={0.5} color="#00ffff" />

            {/* FLOATY TEXT */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                <Text
                    fontSize={viewport.width > 5 ? 1.5 : 0.7}
                    position={[-viewport.width / 3, 1, -1]}
                    color="#fff"
                    anchorX="center"
                    anchorY="middle"
                >
                    DESIGN
                    <meshStandardMaterial color="#fff" emissive="#ff00cc" emissiveIntensity={0.5} toneMapped={false} />
                </Text>
            </Float>

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                <Text
                    fontSize={viewport.width > 5 ? 1.5 : 0.7}
                    position={[viewport.width / 3, 0, -2]}
                    color="#fff"
                    anchorX="center"
                    anchorY="middle"
                >
                    CODE
                    <meshStandardMaterial color="#fff" emissive="#00ffff" emissiveIntensity={0.8} toneMapped={false} />
                </Text>
            </Float>

            {/* FLOATING GLASS SHARDS */}
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <GlassShape position={[-3, 2, 2]} size={0.5} speed={0.5} />
            </Float>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <GlassShape position={[3, -2, 1]} size={0.3} speed={0.8} />
            </Float>
            <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
                <GlassShape position={[-2, -3, -1]} size={0.4} speed={0.3} />
            </Float>

            {/* HERO IMAGE - ANCHORED */}
            <HeroImage />
        </>
    );
};

export default Experience;
