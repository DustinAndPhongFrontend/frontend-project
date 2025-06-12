'use client'

import {DndContext, DragEndEvent} from '@dnd-kit/core';
import Inventory from "@/components/Inventory";
import {useAppDispatch} from "@/components/AppContext";

export default function Page() {
    const dispatch = useAppDispatch()

    function handleDragEnd(event: DragEndEvent): void {
        const {active, over} = event;

        if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            dispatch({type: 'MOVE_ITEM', fromIndex: active.data.current?.inventoryIndex, toIndex: over.data.current?.inventoryIndex});
        }
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
        <div style={{
            alignSelf: "center",
        }}>
            {"Inventory"}
        </div>

        {/* Adding id to DndContext prevents a hydration error */}
        <DndContext
            id="draggable-inventory"
            onDragEnd={handleDragEnd}
        >
            <Inventory/>
        </DndContext>
    </div>
}