'use client'

import {DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import Inventory from "@/components/Inventory";
import {useApp, useAppDispatch} from "@/components/AppContext";
import Equipment, {EQUIPMENT_SLOTS} from "@/components/Equipment";
import Stats from "@/components/Stats";

export default function Page() {
    const dispatch = useAppDispatch()
    const state = useApp()

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
    );

    function handleDragEnd(event: DragEndEvent): void {
        const {active, over} = event;

        if (over) {
            // drop on equipment
            if (over && EQUIPMENT_SLOTS.includes(over.data.current?.slot)) {
                if (over.data.current?.accepts.includes(active.data.current?.type)) {
                    dispatch({
                        type: 'EQUIP_ITEM',
                        equipment_slot: over.data.current?.slot,
                        item: state.inventory[active.data.current?.inventoryIndex]
                    });
                    const audio = new Audio(`${process.env.basePath}equip-item.mp3`, )
                    audio.play().catch(console.error)
                } else {
                    const audio = new Audio(`${process.env.basePath}error.mp3#t=0.8`)
                    audio.play().catch(console.error)
                }
            // drop on inventory
            } else if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
                dispatch({
                    type: 'MOVE_ITEM',
                    fromIndex: active.data.current?.inventoryIndex,
                    toIndex: over.data.current?.inventoryIndex
                });
            }
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
            sensors={sensors}
        >
            <div className={"inventory-container"}>
                {/* The Stats component is not droppable or draggable, but it is convenient for it to be here */}
                <Stats/>
                <Equipment/>
                <Inventory/>
            </div>
        </DndContext>
    </div>
}