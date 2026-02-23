import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function CameraRig() {
    const t = useRef(0)

    useFrame((state, delta) => {
        t.current += delta * 0.2

        // Gentle floating camera effect
        state.camera.position.x = Math.sin(t.current) * 0.5
        state.camera.position.y = 1 + Math.sin(t.current) * 0.2

        // Always look at center
        state.camera.lookAt(0, 0, 0)
    })

    return null
}
