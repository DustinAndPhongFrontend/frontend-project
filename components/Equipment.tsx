import {useDroppable} from "@dnd-kit/core";
import {useApp} from "@/components/AppContext";
import {EquipmentItem} from "@/components/items";

function HelmetSlot({helmet} : {helmet: EquipmentItem | null}) {
    const {setNodeRef} = useDroppable({
        id: `helmet`,
        data: {
            accepts: ['helmet'],
            slot: 'helmet'
        },
    });

    if (helmet) {
        return <div className={"inventory-slot"} ref={setNodeRef}>
            {helmet.name}
        </div>
    }
    return <div className={"inventory-slot"} ref={setNodeRef}>
        Helmet
    </div>
}

function ArmorSlot() {
    const {setNodeRef} = useDroppable({
        id: `armor`,
        data: {
            accepts: ['armor'],
            slot: 'armor'
        },
    });
    return <div className={"inventory-slot"} ref={setNodeRef}>
        Armor
    </div>
}

function WeaponSlot({weapon} : {weapon: EquipmentItem | null}) {
    const {setNodeRef, isOver} = useDroppable({
        id: `weapon`,
        data: {
            accepts: ['weapon'],
            slot: 'weapon'
        },
    });

    if (weapon) {
        return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
            {weapon.name}
        </div>
    }
    return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
        Weapon
    </div>
}

function BootsSlot() {
    const {setNodeRef} = useDroppable({
        id: `boots`,
        data: {
            accepts: ['boots'],
            slot: 'boots'
        },
    });

    return <div className={"inventory-slot"} ref={setNodeRef}>
        Boots
    </div>
}

export default function Equipment() {
    const {equipment} = useApp()

    return <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridAutoRows: '20vh'
    }}>
        <h1>Equipment</h1>
        <HelmetSlot helmet={equipment.helmet}/>
        <ArmorSlot/>
        <WeaponSlot weapon={equipment.weapon}/>
        <BootsSlot />
    </div>
}