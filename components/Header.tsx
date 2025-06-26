'use client'

import Logo from "@/components/Logo";
import Link from "next/link";
import localFont from "next/font/local";

const unifrakturMaguntia = localFont({
    src: '../app/UnifrakturMaguntia-Regular.ttf',
})

export default function Header() {

    return <header style={{
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }} className={unifrakturMaguntia.className}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
                        <span style={{
                            width: '5vw'
                        }}>
                <Logo/>
            </span>
            <div style={{
                fontSize: '3rem',
            }}>
                <Link href={"/"}>Medieval Times</Link>
            </div>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '20vw',
            fontSize: '2rem',
        }}>
            <Link href={'/'}>{"Home"}</Link>
            <Link href={'/message-board'}>{"Quests"}</Link>
            <Link href={'/inventory'}>{"Inventory"}</Link>
        </div>
    </header>
}