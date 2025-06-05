'use client'

import {useState} from "react";
import {useDraggable} from "@dnd-kit/core";

type Stats = {
    intelligence: number;
    strength: number;
    dexterity: number;
    luck: number;
    health: number;
    mana: number;
    damage: number;
}

type Item = {
    id: string;
    name: string;
    description: string;
    image: string;
}

type EquipmentItem = Item & {
    stats: Stats;
    class?: Class;
}

enum Class {
    Knight = "Knight",
    Wizard = "Wizard",
    Archer = "Archer",
}

// maybe this should actually be a map from id -> item
// There should be a way to reference each by variable name, maybe through graphql
const EQUIPMENT: EquipmentItem[] = [
    {
        id: "1",
        name: "sword",
        description: "",
        image: "",
        stats: {
            intelligence: 0,
            strength: 0,
            dexterity: 0,
            luck: 0,
            health: 0,
            mana: 0,
            damage: 0
        },
        class: Class.Knight,
    },
    {
        id: "2",
        name: "shield",
        description: "",
        image: "",
        stats: {
            intelligence: 0,
            strength: 0,
            dexterity: 0,
            luck: 0,
            health: 0,
            mana: 0,
            damage: 0
        },
        class: Class.Knight,
    }
]

const ITEMS: Item[] = [
    {
        id: "3",
        name: "health potion",
        description: "",
        image: "",
    }
]

const sampleItems: Item[] = [
    ITEMS[0],
    EQUIPMENT[0],
    EQUIPMENT[1],
]

const INVENTORY_SIZE = 16
const EMPTY_ITEM = {
    id: "",
    name: "",
    description: "",
    image: "",
}

type InventorySlotProps = {
    item: Item
}

function InventorySlot({item}: InventorySlotProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return <div className={"inventory-slot"} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className={"inventory-slot-name"}>{item.name}</div>
    </div>
}

// TODO: make an underlying grid and then put the items on top of it, so when you drag them, it shows an empty slot
// https://www.apollographql.com/docs/
// https://dndkit.com/
export default function Inventory() {
    const [inventory] = useState<Item[]>(sampleItems)

    return <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '20vh'
        }}>
            {inventory
                .concat(
                    Array(INVENTORY_SIZE - inventory.length)
                        .fill(EMPTY_ITEM)
                )
                .map((item: Item, index: number) => <InventorySlot item={item} key={index} />)}
        </div>
}