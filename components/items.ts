enum CharacterClass {
    Knight = "Knight",
    Wizard = "Wizard",
    Archer = "Archer",
}


export type Item = {
    id: string;
    name: string;
    description: string;
    image: string;
}

type Stats = {
    intelligence: number;
    strength: number;
    dexterity: number;
    luck: number;
    health: number;
    mana: number;
    damage: number;
}

type EquipmentItem = Item & {
    stats: Stats;
    class?: CharacterClass;
}

// maybe this should actually be a map from id -> item
// There should be a way to reference each by variable name, maybe through graphql
export const EQUIPMENT: EquipmentItem[] = [
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
        class: CharacterClass.Knight,
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
        class: CharacterClass.Knight,
    }
]

export const ITEMS: Item[] = [
    {
        id: "3",
        name: "health potion",
        description: "",
        image: "",
    }
]
