export const navModules = [
  {
    label: 'Dashboard',
    id: 'dashboard',
    icon: 'ri-dashboard-line',
    parent: '',
    hasChildren: false,
    children: ''
  },
  {
    label: 'Company',
    id: 'company',
    icon: 'ri-briefcase-line',
    parent: '',
    hasChildren: false,
    children: ''
  },
  {
    label: 'Contact',
    id: 'contact',
    icon: 'ri-user-line',
    parent: '',
    hasChildren: true,
    children: [
      {
        label: 'Recently Viewed',
        id: 'recentlyViewed',
        icon: '',
        parent: 'contact',
        hasChildren: true,
        children: ''
      },
      {
        label: 'My Favorites',
        id: 'myFavorites',
        icon: '',
        parent: 'contact',
        hasChildren: false,
        children: ''
      },
    ]
  },
  {
    label: 'Project',
    id: 'project',
    icon: 'ri-hammer-line',
    parent: '',
    hasChildren: false,
    children: ''
  },
  {
    label: 'Order',
    id: 'order',
    icon: 'ri-shopping-basket-2-line',
    parent: '',
    hasChildren: true,
    children: [
      {
        label: 'Recent Orders',
        id: 'recentOrders',
        icon: '',
        parent: 'order',
        hasChildren: true,
        children: ''
      },
    ]
  },
  {
    label: 'Time Card',
    id: 'timeCard',
    icon: 'ri-timer-line',
    parent: '',
    hasChildren: false,
    children: ''
  },
];