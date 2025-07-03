'use client'

import Logo from "@/components/Logo";
import Link from "next/link";
import localFont from "next/font/local";
import { animated, useSpring } from '@react-spring/web';
import { useApp } from "@/components/AppContext";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navItems, animations } from './headerConfig';
import styles from './Header.module.css';

const unifrakturMaguntia = localFont({
    src: '../app/UnifrakturMaguntia-Regular.ttf',
});

export default function Header() {
    const { acceptedQuests } = useApp();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const titleAnimation = useSpring(animations.title);
    const navAnimation = useSpring(animations.nav);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Close mobile menu when clicking outside or resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} ${unifrakturMaguntia.className}`}>
                
                {/* Logo and Title Section */}
                <animated.div 
                    style={titleAnimation}
                    className={styles.logoSection}
                >
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>
                    
                    <Link href="/" className={styles.title}>
                        Medieval Times
                    </Link>
                </animated.div>

                {/* Desktop Navigation Links */}
                <animated.div 
                    style={navAnimation}
                    className={styles.navLinks}
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const showBadge = item.showBadge && acceptedQuests.length > 0;
                        
                        return (
                            <div key={item.href} className={styles.navItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.navIcon}>
                                        {item.icon}
                                    </span>
                                    <span className={styles.navLabel}>
                                        {item.label}
                                    </span>
                                </Link>
                                
                                {/* Desktop Quest Badge */}
                                {showBadge && (
                                    <div className={`${styles.badge} ${styles.badgeAnimated}`}>
                                        {acceptedQuests.length}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </animated.div>

                {/* Mobile Hamburger Button */}
                <button
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileNavLinks}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const showBadge = item.showBadge && acceptedQuests.length > 0;
                            
                            return (
                                <div key={item.href} className={styles.mobileNavItem}>
                                    <Link
                                        href={item.href}
                                        className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                                    >
                                        <span className={styles.navIcon}>
                                            {item.icon}
                                        </span>
                                        <span className={styles.navLabel}>
                                            {item.label}
                                        </span>
                                        
                                        {/* Mobile Quest Badge */}
                                        {showBadge && (
                                            <div className={styles.mobileBadge}>
                                                {acceptedQuests.length}
                                            </div>
                                        )}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}