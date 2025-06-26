'use client'

import Logo from "@/components/Logo";
import Link from "next/link";
import localFont from "next/font/local";
import {animated, useSpring} from '@react-spring/web'

const unifrakturMaguntia = localFont({
    src: '../app/UnifrakturMaguntia-Regular.ttf',
})

export default function Header() {
    const styles = useSpring({
        from: {
            opacity: 0,
            y: '6%',
        },
        to: {
            opacity: 1,
            y: 0,
        },
    })

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
            <animated.div style={{
                fontSize: '3rem',
                ...styles
            }}>
                <Link href={"/"}>Medieval Times</Link>
            </animated.div>
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