'use client'

import {Stats} from '@/components/items'
import {useEffect, useState} from "react";

const NOUN_LIST = [
    "Baron",
    "Canon",
    "Chancellor",
    "Dreng",
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
    "houred",
    "astonishing",
    "bountiful",
    "daring",
    "dapper",
    "devouted",
    "delicious",
    "elderly",
    "educated",
]

export default function Home() {

    async function playHorn() {
        const audio = new Audio(`/horn-sound.mp3`)
        await audio.play()
    }

    const [username, setUsername] = useState<string>('')
    const [characterClass, setCharacterClass] = useState<string>('Knight')
    const [stats, setStats] = useState<Stats>(rollStats())

    const [placeholderUsername, setPlaceholderUsername] = useState<string>("")

    function rollStats(): Stats {
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

        return () => clearInterval(intervalId)
    }, [])

    // Check if player was already created
    // If not show character creation screen
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
          <h1>Choose your character</h1>
            <label>Username</label>
            {/* Randomly create username placeholders, click button to generate username*/}
            <input type={"text"}
                   name={"username"}
                   placeholder={placeholderUsername}
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required={true}
                   suppressHydrationWarning />

            <label>Class</label>
            <select value={characterClass} onChange={(e) => setCharacterClass(e.target.value)}>
                <option>Knight</option>
                <option>Magician</option>
                <option>Archer</option>
            </select>

            <label>Roll your stats</label>
            <button onClick={() => setStats(rollStats())} id={"stats-dice-button"}>🎲</button>
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
            <button onClick={() => {
                playHorn().catch(console.error)
            }}>Create Your Character</button>
        </div>
  );
}
