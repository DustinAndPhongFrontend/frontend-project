import {useDroppable} from "@dnd-kit/core";
import {useApp} from "@/components/AppContext";
import {EquipmentItem} from "@/components/items";

export const EQUIPMENT_SLOTS = ["weapon", "helmet", "armor", "boots"]


function HelmetSlot({helmet} : {helmet: EquipmentItem | null}) {
    const {setNodeRef, isOver} = useDroppable({
        id: `helmet`,
        data: {
            accepts: ['helmet'],
            slot: 'helmet'
        },
    });

    if (helmet) {
        return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
            {helmet.name}
        </div>
    }
    return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
        Helmet
    </div>
}

function ArmorSlot({armor}: {armor: EquipmentItem | null}) {
    const {setNodeRef, isOver} = useDroppable({
        id: `armor`,
        data: {
            accepts: ['armor'],
            slot: 'armor'
        },
    });
    if (armor) {
        return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
            {armor.name}
        </div>
    }
    return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
        Armor
    </div>
}

function WeaponSlot({weapon}: {weapon: EquipmentItem | null}) {
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

function BootsSlot({boots}: {boots: EquipmentItem | null}) {
    const {setNodeRef, isOver} = useDroppable({
        id: `boots`,
        data: {
            accepts: ['boots'],
            slot: 'boots'
        },
    });
    if (boots) {
        return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
            {boots.name}
        </div>
    }
    return <div className={`${isOver && "inventory-slot-hovered-with-droppable"} inventory-slot`} ref={setNodeRef}>
        Boots
    </div>
}

export default function Equipment() {
    const {equipment} = useApp()

    return <div>
        <h1>Equipment</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridAutoRows: '20vh'
        }}>
            <HelmetSlot helmet={equipment.helmet}/>
            <ArmorSlot armor={equipment.armor}/>
            <WeaponSlot weapon={equipment.weapon}/>
            <BootsSlot boots={equipment.boots}/>
        </div>
    </div>
}