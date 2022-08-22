const navModules = [
  {
    label: 'Dashboard',
    id: 'dashboard',
    icon: 'ri-dashboard-line',
    hasChildren: false,
    parents: ''
  },
  {
    label: 'Company',
    id: 'company',
    icon: 'ri-briefcase-line',
    hasChildren: false,
    parents: ''
  },
  {
    label: 'Contact',
    id: 'contact',
    icon: 'ri-user-line',
    hasChildren: true,
    parents: ''
  },
  {
    label: 'Recently Viewed',
    id: 'recentlyViewed',
    icon: '',
    hasChildren: false,
    parents: [
      'contact',
      'mega'
    ]
  },
  {
    label: 'Project',
    id: 'project',
    icon: 'ri-hammer-line',
    hasChildren: false,
    parents: ''
  },
  {
    label: 'Order',
    id: 'order',
    icon: 'ri-shopping-basket-2-line',
    hasChildren: false,
    parents: ''
  },
  {
    label: 'Time Card',
    id: 'timeCard',
    icon: 'ri-timer-line',
    hasChildren: false,
    parents: ''
  },
];

const liClass = 'nav flex rounded-xl w-full h-14 p-3 items-center gap-4 hover:bg-indigo-800 hover:cursor-pointer';
const iClass = 'text-white text-xl pointer-events-none';
const pClass = 'text-white font-[Poppins] pointer-events-none';

let navMenu = document.getElementById('navMenu');
navModules.forEach(module => {
  const { label, id, icon, hasChildren, parents } = module;

  const li = document.createElement('li');
  li.id = id;
  $(li).addClass(liClass);
  $(li).attr('hasChildren', hasChildren);
  $(li).attr('parents', parents);

  const i = document.createElement('i');
  $(i).addClass(`${icon} ${iClass}`);
  
  const p = document.createElement('p');
  p.innerText = label;
  $(p).addClass(pClass);

  if (!icon) {
    $(p).addClass('pl-10 text-indigo-200');
  }
  
  li.appendChild(i);
  li.appendChild(p);

  navMenu.appendChild(li);
});

$('.nav').on('click', function(e) {
  const id = e.target.id;
  const hasChildren = $(this).attr('hasChildren');
  const parents = $(this).attr('parents').toString().split(', ');

  if (hasChildren === 'true') {
    // console.log($('[data-contact]'));
  };
});