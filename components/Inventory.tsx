'use client'

import {useDraggable, useDroppable} from "@dnd-kit/core";
import {EMPTY_ITEM, useApp} from "@/components/AppContext";
import {Item} from "@/components/items";
import {EQUIPMENT_SLOTS} from "@/components/Equipment";


type InventorySlotProps = {
    item: Item,
    inventoryIndex: number
}

function InventorySlot({item, inventoryIndex}: InventorySlotProps) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: `draggable-${inventoryIndex}`,
        data: {
            type: item.type,
            inventoryIndex: inventoryIndex
        },
    });

    const {setNodeRef: setDroppableNodeRef, isOver} = useDroppable({
        id: `droppable-${inventoryIndex}`,
        data: {
            accepts: ['item', 'armor', 'weapon', 'boots', 'helmet'],
            inventoryIndex: inventoryIndex
        },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return <div className={`${isOver && !isDragging && "inventory-slot-hovered-with-droppable"} inventory-slot ${isDragging && "dragging-inventory-slot"}`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className={"inventory-slot-item-droppable-area"} ref={setDroppableNodeRef}></div>
        <div className={"inventory-slot-name"}>{item.name}</div>
    </div>
}


type EmptyInventorySlotProps = {
    inventoryIndex: number
}

function EmptyInventorySlot({inventoryIndex}: EmptyInventorySlotProps) {
    const {setNodeRef, isOver} = useDroppable({
        id: `droppable-${inventoryIndex}`,
        data: {
            accepts: [...EQUIPMENT_SLOTS, 'item'],
            inventoryIndex: inventoryIndex
        },
    });
    return <div className={`${isOver ? "empty-inventory-slot-hovered-with-droppable" : ""} inventory-slot`} ref={setNodeRef}>
        <div className={"inventory-slot-name"}></div>
    </div>
}

export default function Inventory() {
    const {inventory} = useApp()

    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
        <div style={{
            fontSize: "2rem",
            paddingBottom: "1vh"
        }}>
            {"Inventory"}
        </div>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '10vh'
        }}>
            {inventory
                .map((item: Item, index: number) => {
                        if (item === EMPTY_ITEM) {
                            return <EmptyInventorySlot inventoryIndex={index} key={index}/>
                        } else {
                            return <InventorySlot item={item} inventoryIndex={index} key={index}/>
                        }
                    }
                )}
        </div>
    </div>
}