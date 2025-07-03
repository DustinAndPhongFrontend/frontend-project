export interface NavItem {
   href: string;
   label: string;
   icon: string;
   showBadge?: boolean;
}

export const navItems: NavItem[] = [
   { href: '/', label: 'Home', icon: '🏠' },
   { href: '/message-board', label: 'Quests', icon: '📜' },
   { href: '/quest-log', label: 'Quest Log', icon: '📚', showBadge: true },
   { href: '/inventory', label: 'Inventory', icon: '🎒' }
];

export const animations = {
   title: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { tension: 280, friction: 60 }
   },
   nav: {
      from: { opacity: 0, transform: 'translateX(50px)' },
      to: { opacity: 1, transform: 'translateX(0px)' },
      delay: 200,
      config: { tension: 280, friction: 60 }
   }
};