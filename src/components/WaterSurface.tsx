"use client"
import { useFrame, useLoader } from "@react-three/fiber"
import { Water } from "three-stdlib"
import * as THREE from "three"
import { useMemo, useRef } from "react"

export default function WaterSurface() {
    const waterNormals = useLoader(THREE.TextureLoader, "/textures/water-normal.jpg")

    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

    const waterConfig = useMemo(() => ({
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: new THREE.Vector3(1, 1, 1),
        sunColor: 0xffffff,
        waterColor: 0x66d9ff,
        distortionScale: 3.7,
        fog: false,
        format: THREE.RGBAFormat,
    }), [waterNormals])

    const water = useMemo(() => {
        return new Water(new THREE.PlaneGeometry(100, 100), waterConfig)
    }, [waterConfig])

    useFrame((state, delta) => {
        if (water) {
            water.material.uniforms.time.value += delta * 0.2
        }
    })

    return (
        <primitive
            object={water}
            rotation-x={-Math.PI / 2}
            position={[0, -1.5, 0]}
        />
    )
}
