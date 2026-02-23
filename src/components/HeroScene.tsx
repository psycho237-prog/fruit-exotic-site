"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Sparkles, Float } from "@react-three/drei"
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing"
import CameraRig from "./CameraRig"
import WaterSurface from "./WaterSurface"
import Fruits from "./Fruits"
import { Suspense } from "react"

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 1, 5], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />

                {/* We use a preset environment instead of a local HDR for now */}
                <Environment preset="sunset" />

                <CameraRig />

                <Suspense fallback={null}>
                    <WaterSurface />
                </Suspense>

                <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
                    <Fruits />
                </Float>

                {/* Magical bubbles */}
                <Sparkles count={150} scale={12} size={4} speed={0.4} color="#a0e0ff" />

                {/* Cinematic Post-Processing */}
                <EffectComposer enableNormalPass={false}>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
                    <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={5} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
