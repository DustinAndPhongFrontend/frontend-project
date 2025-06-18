'use client'

import {DndContext, DragEndEvent} from '@dnd-kit/core';
import Inventory from "@/components/Inventory";
import {useApp, useAppDispatch} from "@/components/AppContext";
import Equipment from "@/components/Equipment";
import Stats from "@/components/Stats";

export default function Page() {
    const dispatch = useAppDispatch()
    const state = useApp()

    console.log(state)
    const EQUIPMENT_SLOTS = ["weapon", "helmet", "armor", "boots"]
    function handleDragEnd(event: DragEndEvent): void {
        const {active, over} = event;

        console.log(active.data.current, over.data.current)
        console.log(EQUIPMENT_SLOTS.includes(over.data.current?.id))
        if (over && over.data.current?.accepts.includes(active.data.current?.type) && EQUIPMENT_SLOTS.includes(over.data.current?.slot)) {
            // @ts-expect-error
            dispatch({type: 'EQUIP_ITEM', equipment_slot: over.data.current?.slot, item: state.inventory[active.data.current?.inventoryIndex]});
        } else if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            dispatch({type: 'MOVE_ITEM', fromIndex: active.data.current?.inventoryIndex, toIndex: over.data.current?.inventoryIndex});
        }

    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
        {/* Adding id to DndContext prevents a hydration error */}
        <DndContext
            id="draggable-inventory"
            onDragEnd={handleDragEnd}
        >
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
            }}>
                <Stats/>
                <Equipment/>
                <Inventory/>
            </div>
        </DndContext>
    </div>
}