import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tables & Data',
    icon: 'layout-outline',
    children: [
      {
        title: 'Items',
        link: '/pages/tables/items',
      },
      {
        title: 'Challenges',
        link: '/pages/tables/challenges',
      },
      {
        title: 'Sights',
        link: '/pages/tables/sights',
      },
      {
        title: 'Users',
        link: '/pages/tables/users',
      },
    ],
  },
  {
    title: 'Admin Accounts',
    icon: 'people-outline',
    link: '/pages/accounts',
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Reset Password',
        link: '/pages/reset-password',
      }
    ],
  },
];
