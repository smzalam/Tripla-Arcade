import { PuzzlePieceIcon, BookmarkSquareIcon, UserIcon } from '@heroicons/react/24/outline'

export const NavItems = [
    {
        name: 'Games',
        url: '/choose_games',
        Icon: PuzzlePieceIcon,
        imageAlt: 'Games'
    },
    {
        name: 'uide',
        url: '/guide',
        Icon: BookmarkSquareIcon,
        imageAlt: 'Guide'
    },
    {
        name: 'Profile',
        url: '/profile',
        Icon: UserIcon,
        imageAlt: 'Profile'
    },
]
