import { liClass, iClass, pClass } from "../helpers/classes";
import { getModules, buildElement } from "../helpers/helpers";
const _ = require('lodash/collection');

const navModules = [
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
        children: [
          {
            label: 'Today',
            id: 'today',
            icon: '',
            parent: 'recentlyViewed',
            hasChildren: false,
            children: ''
          },
          {
            label: 'This Week',
            id: 'thisWeek',
            icon: '',
            parent: 'recentlyViewed',
            hasChildren: false,
            children: ''
          },
        ]
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
    hasChildren: false,
    children: ''
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

let navMenu = document.getElementById('navMenu');

const flattened = _.flatMapDeep(navModules, getModules);
console.log(flattened);

navModules.forEach(module => {
  const { label, id, icon, hasChildren, children } = module;
  
  const li = buildElement(
    '<li>', 
    {
      id: id,
      withClass: liClass,
      data: [
        {
          'id': id,
          'hasChildren': hasChildren,
          'children': children
        }
      ]
    }
  );

  const i = buildElement(
    '<i>', 
    {
      withClass: iClass,
      icon: icon,
    }
  );

  const p = buildElement(
    '<p>',
    {
      withClass: `${pClass} ${!icon && 'pl-10 text-indigo-200'}`,
      text: label,
    }
  )

  $(li).append(i);
  $(li).append(p);

  $(navMenu).append(li);

  // if (hasChildren) {
  //   children.forEach(child => {
  //     console.log(child);
  //   });
  // };
})

$('.nav').on('click', function(e) {
  console.log($(this).data());
});