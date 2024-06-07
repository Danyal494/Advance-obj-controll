import { Environment, OrbitControls, RandomizedLight } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'

const ObjectController = () => {
    const meshRef = useRef()
    const scrollXRef = useRef(0)
    const scrollYRef = useRef(0)

    useEffect(() => {
        const handleScroll = (event) => {
            scrollXRef.current += event.deltaX * 0.01
            scrollYRef.current += event.deltaY * 0.01
        }

        window.addEventListener('wheel', handleScroll, { passive: true })
        return () => window.removeEventListener('wheel', handleScroll)
    }, [])

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x = scrollYRef.current
            meshRef.current.rotation.y = scrollXRef.current
        }
    })

    return (
        <mesh ref={meshRef}  position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial metalness={1} roughness={0} color="orange" />
    </mesh>

    )
}

const Scanvas = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas style={{ width: '100%', height: '100%' }}
                camera={{ position: [2, 2, 2], fov: 75 }}
                shadows>
                <color attach="background" args={['#64748b']} />
                <RandomizedLight position={[2, 5, 5]} />
                <Environment preset="sunset" background={false} />
                <OrbitControls enableZoom={false} enablePan={false} />

                <ObjectController />

                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.5} />
                </mesh>
            </Canvas>
        </div>
    )
}

export default Scanvas
