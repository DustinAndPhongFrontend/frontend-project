'use client'

import {useAppDispatch} from "@/components/AppContext";

interface ModalProps {
    show: boolean,
    setShow: (show: boolean) => void
}

export default function Modal({show, setShow}: ModalProps) {
    const dispatch = useAppDispatch()

    if (show === false) {
        return null
    }

    return <div id={"modal"}
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgb(0,0,0,0.25)',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => setShow(false)}
                suppressHydrationWarning>
        <div style={{
            backgroundColor: "#f4e8d0",
            border: "4px solid #8b4513",
            color: "black",
            borderRadius: "8px",
            padding: "clamp(1rem, 3vw, 2rem)"
        }}
             onClick={(e) => {
                 e.stopPropagation()
             }}
        >
            This will delete your character permanently, are you sure?
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '1rem',
            }}>
                <button
                    onClick={() => {
                        const audio = new Audio("https://dustin-alandzes-personal.s3.us-east-1.amazonaws.com/multiverse/PeasantDeath.wav#t=0.1")
                        audio.play().catch(console.error)

                        dispatch({type: "DELETE_CHARACTER"})
                        setShow(false)
                    }}
                    style={{
                        backgroundColor: "#ff6f6f",
                        borderRadius: "8px",
                        padding: "4px",
                        color: "white"
                    }}
                >
                    Yes, delete my character
                </button>
                <button onClick={() => setShow(false)}>
                    No, keep it
                </button>
            </div>
        </div>
    </div>
}