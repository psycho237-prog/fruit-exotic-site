"use client"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

interface SplittingFruitProps {
    position: [number, number, number]
    color: string
    scale: number
}

// Helper for "Splitting" effect
function SplittingFruit({ position, color, scale }: SplittingFruitProps) {
    const group = useRef<THREE.Group>(null!)
    const left = useRef<THREE.Mesh>(null!)
    const right = useRef<THREE.Mesh>(null!)

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 })

        // Initial state: merged
        tl.set(left.current.position, { x: 0 })
        tl.set(right.current.position, { x: 0 })
        tl.set(group.current.position, { y: 10 })
        tl.set(group.current.rotation, { z: 0 })

        // 1. Drop
        tl.to(group.current.position, {
            y: -1.4,
            duration: 1.5,
            ease: "power2.in",
        })
            // 2. Splash and Split
            .to(left.current.position, {
                x: -0.5,
                duration: 0.6,
                ease: "power3.out"
            })
            .to(right.current.position, {
                x: 0.5,
                duration: 0.6,
                ease: "power3.out"
            }, "<")
            .to(group.current.rotation, {
                z: Math.PI * 0.5,
                duration: 1,
                ease: "power2.inOut"
            }, "<")

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <group ref={group} position={position} scale={scale}>
            <mesh ref={left} castShadow>
                <sphereGeometry args={[1, 32, 32, 0, Math.PI]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={right} castShadow>
                <sphereGeometry args={[1, 32, 32, Math.PI, Math.PI]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

export default function Fruits() {
    const groupRef = useRef<THREE.Group>(null!)

    return (
        <group ref={groupRef}>
            {/* Cinematic Fruit Drop and Split */}
            <SplittingFruit position={[-1.5, 0, -1]} color="#ff3366" scale={0.6} />
            <SplittingFruit position={[1.5, 0, 0]} color="#ffa600" scale={0.8} />
            <SplittingFruit position={[0, 0, -2]} color="#ccff00" scale={0.7} />

            {/* Floating Bubbles / Chunks */}
            {Array.from({ length: 12 }).map((_, i) => (
                <mesh
                    key={`chunk-${i}`}
                    position={[
                        (Math.random() - 0.5) * 8,
                        -1.6 + Math.random() * 0.5,
                        (Math.random() - 0.5) * 8
                    ] as [number, number, number]}
                    scale={0.05 + Math.random() * 0.15}
                >
                    <sphereGeometry args={[1, 12, 12]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={0} metalness={1} />
                </mesh>
            ))}
        </group>
    )
}
