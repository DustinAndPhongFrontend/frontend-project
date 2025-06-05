'use client'

import {DndContext} from '@dnd-kit/core';
import Inventory from "@/components/Inventory";

export default function Page() {
    return <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
        <div style={{
            alignSelf: "center",
        }}>{"Inventory"}</div>
        <DndContext>
            <Inventory/>
        </DndContext>
    </div>
}