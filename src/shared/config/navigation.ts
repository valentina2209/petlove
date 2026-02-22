export interface NavItem {
    title: string;
    path: string;
}

export const NAV_LINKS: NavItem[] = [
    { title: 'News', path: '/news' },
    { title: 'Find pet', path: '/notices' },
    { title: 'Our friends', path: '/friends' },
];