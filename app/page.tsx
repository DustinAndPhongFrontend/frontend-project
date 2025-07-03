'use client'

import {CharacterClass, Stats} from '@/components/items'
import StatsComponent from '@/components/Stats'
import {FormEvent, useEffect, useState} from "react";
import {animated, useSpring} from "@react-spring/web";
import {useApp, useAppDispatch} from "@/components/AppContext";

const NOUN_LIST = [
    "Baron",
    "Canon",
    "Chancellor",
    "Duke",
    "Earl",
    "Fief",
    "Gentleman",
    "Joust",
    "Yoke",
    "Manor"
]

const ADJECTIVE_LIST = [
    "advanced",
    "adventurous",
    "chivalrous",
    "agile",
    "agreeable",
    "ancient",
    "astonishing",
    "bountiful",
    "daring",
    "dapper",
    "devoted",
    "delicious",
    "elderly",
    "educated",
]

export default function Home() {
    const [springs, api] = useSpring(() => ({
        from: { y: 0 },
    }))

    const {username: createdUsername} = useApp()
    const dispatch = useAppDispatch()

    async function createCharacter(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        dispatch({type: "CREATE_CHARACTER", username: username, characterClass: characterClass, stats: stats})

        const audio = new Audio(`${process.env.basePath}horn-sound.mp3`)
        await audio.play()
    }

    const [username, setUsername] = useState<string>('')
    const [characterClass, setCharacterClass] = useState<CharacterClass>(CharacterClass.Knight)
    const [stats, setStats] = useState<Stats>({
        currentHealth: 0,
        currentMana: 0,
        dexterity: 0,
        experience: 0,
        intelligence: 0,
        level: 0,
        luck: 0,
        maxHealth: 0,
        maxMana: 0,
        strength: 0
    })
    const [placeholderUsername, setPlaceholderUsername] = useState<string>("")

    function rollStats(): Stats {
        api.start({
            from: {
                // react-spring...
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                rotate: 0,
            },
            to: {
                rotate: 360,
            }
        })

        return {
            currentHealth: 0,
            currentMana: 0,
            dexterity: Math.floor(Math.random() * 10) + 1,
            experience: 0,
            intelligence: Math.floor(Math.random() * 10) + 1,
            level: 1,
            luck: Math.floor(Math.random() * 10) + 1,
            maxHealth: 0,
            maxMana: 0,
            strength: Math.floor(Math.random() * 10) + 1
        }
    }

    function randomChoice<X>(array: Array<X>) {
        return array[Math.floor(Math.random() * array.length)]
    }

    useEffect(() => {

        function generateUsername() {
            return `${randomChoice(ADJECTIVE_LIST)}${randomChoice(NOUN_LIST)}`
        }
        setPlaceholderUsername(generateUsername())
        const intervalId = setInterval(() => {
            setPlaceholderUsername(generateUsername())
        }, 2000); // 2000ms = 2 second

        setStats(rollStats())

        return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (createdUsername !== "") {
        return <div className={"create-character-container"}
        style={{
            width: "50%",
        }}>
            <StatsComponent/>
        </div>
    }
    return (
        <form
            onSubmit={createCharacter}
            className={"create-character-container"}
            style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 className={"title"}>Choose your character</h1>

            <fieldset>
                <label>Username</label>
                <input type={"text"}
                       name={"username"}
                       placeholder={placeholderUsername}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       required={true}
                       onInvalid={e => {
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           e.target.setCustomValidity('Please reveal your title sire.')
                       }}
                       onInput={e => {
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           e.target.setCustomValidity('')
                       }}
                       suppressHydrationWarning />
            </fieldset>

            <fieldset>
                <label>Class</label>
                <select value={characterClass} onChange={(e) => setCharacterClass(e.target.value as CharacterClass)}>
                    <option value={CharacterClass.Knight}>Knight</option>
                    <option value={CharacterClass.Wizard}>Wizard</option>
                    <option value={CharacterClass.Archer}>Archer</option>
                </select>
            </fieldset>

            <fieldset>
            <label style={{
                fontSize: '2rem'
            }}>Roll your stats</label>
            <animated.button
                type={"button"}
                onClick={() => {setStats(rollStats())}}
                id={"stats-dice-button"}
                style={{...springs}}
            >
                🎲
            </animated.button>
            </fieldset>
            <fieldset>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>🧠 Intelligence</div>
                    <div suppressHydrationWarning>
                        {stats.intelligence}
                    </div>
                </div>
                <div suppressHydrationWarning style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>💪 Strength</div>
                    <div suppressHydrationWarning>
                        {stats.strength}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>🏃‍➡️ Dexterity</div>
                    <div suppressHydrationWarning>
                        {stats.dexterity}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>🍀 Luck</div>
                    <div suppressHydrationWarning>
                        {stats.luck}
                    </div>
                </div>
            </div>
            </fieldset>

            <fieldset style={{
                display: 'flex',
                justifyContent: "center"
            }}>
                <button
                    type={"submit"}
                    className={"create-character-submit-button"}
                >
                     Create Your Character
                </button>
            </fieldset>
        </form>
  );
}
