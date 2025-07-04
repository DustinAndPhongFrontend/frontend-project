'use client'
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {JSX, useEffect, useRef, useState} from 'react'
import { useGLTF,

} from '@react-three/drei'
import {GLTF} from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Cube4214: THREE.Mesh,Cube4214_1: THREE.Mesh,Cube4214_2: THREE.Mesh

    }
    materials: {
        ['Metal.102']: THREE.MeshStandardMaterial,['BrownDark.073']: THREE.MeshStandardMaterial,['Stone.037']: THREE.MeshStandardMaterial
    }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group | null>(null)
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sword-1/model.gltf') as unknown as GLTFResult

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (
        <group ref={group}
               {...props}
               dispose={null}
               onPointerOver={() => setHovered(true)}
               onPointerOut={() => setHovered(false)}>
            <group rotation={[Math.PI / 2, 0, 0,]} scale={1.1}>
                <mesh geometry={nodes.Cube4214.geometry} material={materials['Metal.102']} />
                <mesh geometry={nodes.Cube4214_1.geometry} material={materials['BrownDark.073']} />
                <mesh geometry={nodes.Cube4214_2.geometry} material={materials['Stone.037']} />
            </group>

        </group>
    )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sword-1/model.gltf')