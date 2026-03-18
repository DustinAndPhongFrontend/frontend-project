import Image from 'next/image'

export default function Logo() {
    return (
        <Image
            src="/sword-icon.webp"
            alt="Sword logo"
            width={80}
            height={80}
            priority
        />
    )
}