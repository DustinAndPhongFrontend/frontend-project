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
    image?: string;
    type: string;
}

export type EquipmentStats = {
    strength: number;
    dexterity: number;
    intelligence: number;
    luck: number;
    maxHealth: number;
    maxMana: number;
}

// Item type for equipment with stats
export type EquipmentItem = {
    id: string;
    name: string;
    description: string;
    image?: string;
    type: string;
    equipmentSlot: string;
    rarity: string;
    value: number;
    stats: EquipmentStats;
    requirements: {
        level: number;
        class: string | null;
    };
}

// Material/Consumable Item type
export type MaterialItem = {
    id: string;
    name: string;
    description: string;
    image?: string;
    type: string;
    equipmentSlot: null;
    rarity: string;
    value: number;
    stats: null;
    requirements: null;
    craftingMaterial?: boolean;
    effect?: {
        type: string;
        amount: number;
    };
}

export type GameItem = EquipmentItem | MaterialItem | Item;

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
        if (cur && cur.stats) {
            return {
                ...acc,
                strength: acc.strength + cur.stats.strength,
                intelligence: acc.intelligence + cur.stats.intelligence,
                dexterity: acc.dexterity + cur.stats.dexterity,
                luck: acc.luck + cur.stats.luck,
                maxHealth: acc.maxHealth + cur.stats.maxHealth,
                maxMana: acc.maxMana + cur.stats.maxMana
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

// maybe this should actually be a map from id -> item
// There should be a way to reference each by variable name, maybe through graphql
// maybe transform it?
export const EQUIPMENT: EquipmentItem[] = [
    {
        id: "1",
        name: "sword",
        description: "",
        image: "",
        type: "weapon",
        equipmentSlot: "weapon",
        rarity: "common",
        value: 50,
        stats: {
            intelligence: 0,
            strength: 10,
            dexterity: 0,
            luck: 10,
            maxHealth: 0,
            maxMana: 0,
        },
        requirements: {
            level: 1,
            class: "Knight"
        }
    },
    {
        id: "2",
        name: "Hard hat",
        description: "",
        image: "",
        type: "helmet",
        equipmentSlot: "helmet",
        rarity: "common",
        value: 25,
        stats: {
            intelligence: 0,
            strength: 10,
            dexterity: 0,
            luck: 0,
            maxHealth: 0,
            maxMana: 0,
        },
        requirements: {
            level: 1,
            class: null
        }
    },
    {
        id: "3",
        name: "Leather boots",
        description: "",
        image: "",
        type: "boots",
        equipmentSlot: "boots",
        rarity: "common",
        value: 30,
        stats: {
            intelligence: 0,
            strength: 0,
            dexterity: 20,
            luck: 0,
            maxHealth: 0,
            maxMana: 0,
        },
        requirements: {
            level: 1,
            class: null
        }
    },
    {
        id: "4",
        name: "Magician robe",
        description: "",
        image: "",
        type: "armor",
        equipmentSlot: "armor",
        rarity: "uncommon",
        value: 75,
        stats: {
            intelligence: 100,
            strength: 0,
            dexterity: 0,
            luck: 30,
            maxHealth: 0,
            maxMana: 0,
        },
        requirements: {
            level: 1,
            class: null
        }
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
