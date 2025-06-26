import {EquippedItems} from "@/components/AppContext";

export enum CharacterClass {
    Knight = "Knight",
    Wizard = "Wizard",
    Archer = "Archer",
}


export type Item = {
    id: string;
    name: string;
    description: string;
    image: string;
    type: string;
}

export type Stats = {
    level: number;
    experience: number;
    intelligence: number;
    strength: number;
    dexterity: number;
    luck: number;
    currentHealth: number;
    maxHealth: number;
    currentMana: number;
    maxMana: number;
}

export function experienceRequiredToLevelUp(level: number): number{
    const BASE_EXPERIENCE = 100;
    return BASE_EXPERIENCE * (level ** 2)
}

export function statsFromEquipment(equipment: EquippedItems): Stats {
    const equipmentArray = [equipment.helmet, equipment.armor, equipment.weapon, equipment.boots]
    const baseStats: Stats = {
        currentHealth: 0,
        maxHealth: 0,
        currentMana: 0,
        maxMana: 0,
        dexterity: 0,
        intelligence: 0,
        luck: 0,
        strength: 0,
        level: 0,
        experience: 0
    }
    return equipmentArray.reduce<Stats>((acc: Stats, cur: EquipmentItem | null) => {
        if (cur) {
            return {
                ...acc,
                strength: acc.strength + cur?.stats.strength,
                intelligence: acc.intelligence + cur?.stats.intelligence,
                dexterity: acc.dexterity + cur?.stats.dexterity,
                luck: acc.luck + cur?.stats.luck,
            }
        } else {
            return acc
        }
    }, baseStats)
}

export enum EquipmentSlots {
    helmet = "helmet",
    armor = "armor",
    weapon = "weapon",
    boots = "boots",
}

export type EquipmentItem = Item & {
    stats: Stats;
    class: CharacterClass | null;
    type: EquipmentSlots
}

// maybe this should actually be a map from id -> item
// There should be a way to reference each by variable name, maybe through graphql
// maybe transform it?
export const EQUIPMENT: EquipmentItem[] = [
    {
        id: "1",
        name: "sword",
        description: "",
        image: "",
        stats: {
            intelligence: 0,
            strength: 10,
            dexterity: 0,
            luck: 10,
            currentHealth: 0,
            maxHealth: 0,
            currentMana: 0,
            maxMana: 0,
            level: 0,
            experience: 0
        },
        class: CharacterClass.Knight,
        type: EquipmentSlots.weapon
    },
    {
        id: "2",
        name: "Hard hat",
        description: "",
        image: "",
        stats: {
            intelligence: 0,
            strength: 10,
            dexterity: 0,
            luck: 0,
            currentHealth: 0,
            maxHealth: 0,
            currentMana: 0,
            maxMana: 0,
            level: 0,
            experience: 0
        },
        class: null,
        type: EquipmentSlots.helmet
    },
    {
        id: "3",
        name: "Leather boots",
        description: "",
        image: "",
        stats: {
            intelligence: 0,
            strength: 0,
            dexterity: 20,
            luck: 0,
            currentHealth: 0,
            maxHealth: 0,
            currentMana: 0,
            maxMana: 0,
            level: 0,
            experience: 0
        },
        class: null,
        type: EquipmentSlots.boots
    },
    {
        id: "4",
        name: "Magician robe",
        description: "",
        image: "",
        stats: {
            intelligence: 100,
            strength: 0,
            dexterity: 0,
            luck: 30,
            currentHealth: 0,
            maxHealth: 0,
            currentMana: 0,
            maxMana: 0,
            level: 0,
            experience: 0
        },
        class: null,
        type: EquipmentSlots.armor
    },
]

export const ITEMS: Item[] = [
    {
        id: "3",
        name: "health potion",
        description: "",
        image: "",
        type: "item"
    }
]
