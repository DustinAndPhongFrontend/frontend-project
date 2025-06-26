import {useApp} from "@/components/AppContext";
import {experienceRequiredToLevelUp, statsFromEquipment} from "@/components/items";

export default function Stats() {
    const {username, characterClass, stats, equipment} = useApp()
    const equippedStats = statsFromEquipment(equipment)

    return <div>
        <h1>Stats</h1>

        <div style={{
            display: "grid"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10vh"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Username</div>
                    <div>{username}</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Class</div>
                    <div>{characterClass}</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Level</div>
                    <div>{stats.level}</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Experience</div>
                    <div>{stats.experience}/{experienceRequiredToLevelUp(stats.level)}</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Health</div>
                    <div>{stats.currentHealth}/{stats.maxHealth}</div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Mana</div>
                    <div>{stats.currentMana}/{stats.maxMana}</div>
                </div>
            </div>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Intelligence</div>
                    <div>
                        {stats.intelligence + equippedStats.intelligence} {" "}
                        (+ {equippedStats.intelligence})
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Strength</div>
                    <div>
                        {stats.strength + equippedStats.strength} {" "}
                        (+ {equippedStats.strength})
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Dexterity</div>
                    <div>
                        {stats.dexterity + equippedStats.dexterity} {" "}
                        (+ {equippedStats.dexterity})
                    </div>                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div>Luck</div>
                    <div>
                        {stats.luck + equippedStats.luck} {" "}
                        (+ {equippedStats.luck})
                    </div>
                </div>
            </div>
        </div>
    </div>
}