'use client'

import {Canvas} from "@react-three/fiber";
import Sword from "./Sword";
import {Suspense} from "react";
import {OrbitControls, Stage} from "@react-three/drei";

function InsideCanvas() {
    return <group>
        <OrbitControls
            autoRotate={true}
            autoRotateSpeed={5}
            minPolarAngle={Math.PI/2}
            maxPolarAngle={Math.PI/2}
        />
        <Stage
            shadows={false}
            environment={"apartment"}
            intensity={1}
            center={{precise: true}}
        >
        <Suspense>
            <Sword/>
        </Suspense>
        </Stage>
    </group>
}

export default function Logo() {
    return <Canvas>
        <InsideCanvas/>
    </Canvas>
}