// import { liClass, iClass, pClass } from "../helpers/classes";
import { getModules, buildElement } from "../helpers/helpers";
import { navModules } from "../helpers/exampleData";
const _ = require('lodash/collection');

const liClass = 'nav grid grid-cols-6 h-14 rounded-xl w-full items-center p-3 hover:bg-indigo-800 hover:cursor-pointer select-none relative overflow-hidden';
const liActiveClass = 'bg-indigo-800';
const iClass = 'text-white text-xl col-span-1 pointer-events-none justify-self-center select-none';
const pClass = 'text-white font-[Poppins] col-span-4 pointer-events-none select-none';

const modules = _.flatMapDeep(navModules, getModules);

window.loadNavigation = (json) => {

  const obj = JSON.parse(json);

  const fmModules = obj.data.map(record => {
    const data = record.fieldData;
    const id = data.__kp_Module_ID;
    const label = data.ModuleName;
    const camelCase = data.ModuleNameCamelCase__ct;
    const parent = data._kf_ParentModule_ID;
    const hasChildren = data.hasChildren__cn === 'true' ? true : false;
    const icon = data.Icon;

    const recordObj = {camelCase, icon, id, label, parent, hasChildren};
    return recordObj;
  });

  const allParents = fmModules.filter(module => {
    return module.parent;
  }).map(module => {
    return module.parent;
  });
  const parents = [...new Set(allParents)];
  
  const childDivs = parents.map(parent => {
    const div = buildElement(
      '<div>',
      {
        id: `${parent}-children`,
        withClass: 'hidden',
        data: {
          'id': parent,
          'withClass': 'bg-red-500 h-14'
        }
      }
    )
    return {
      id: `${parent}-children`,
      div: div 
    };
  });
  
  const moduleElements = fmModules.map(el => {
    const { label, camelCase, id, icon, parent, hasChildren } = el;
    
    const li = buildElement(
      '<li>', 
      {
        id: id,
        withClass: liClass,
        data: [
          {
            'camelCase': camelCase,
            'id': id,
            label: label,
            'parent': parent,
            'hasChildren': hasChildren,
          }
        ]
      }
    );
    
    const i = icon ? buildElement(
      '<i>', 
      {
        withClass: iClass,
        icon: icon,
      }
    ) : '';
  
    const p = buildElement(
      '<p>',
      {
        withClass: `${pClass} ${parent && 'pl-16 text-indigo-200 text-sm relative group'}`,
        text: label,
      }
    );
  
    const chevron = hasChildren ? buildElement('<i>', {id: `${id}-chevron`, withClass: iClass, icon: 'ri-arrow-down-s-line transition'}) : null;
  
    $(li).append([i && i, p, chevron && chevron]);
  
    return li;
  });
  
  let navMenu = document.getElementById('navMenu');
  
  moduleElements.forEach(module => {
    const { id, parent, hasChildren } = $(module).data()[0];
  
    if (!parent) {
      $(navMenu).append(module);
    } else{
      
      const childDiv = childDivs.filter(div => {
        return div.id === `${parent}-children`
      });
      $(`#${parent}-children`).length === 0 && $(navMenu).append(childDiv[0].div[0]);
      $(`#${parent}-children`).append(module);
    };
  
  });

  $('.nav').on('click', function(e) {
    console.log($(this).data()[0]);
    const { camelCase, label, id, hasChildren } = $(this).data()[0];
    if ( hasChildren ) {
      $(`#${id}-children`).toggleClass('hidden');
      $(`#${id}-chevron`).toggleClass('rotate-180');
    }

    !hasChildren && FileMaker.PerformScript('GetNavigationClick', label);
  });

};

// const allParents = modules.filter(module => {
//   return module.parent;
// }).map(module => {
//   return module.parent;
// });
// const parents = [...new Set(allParents)];

// const childDivs = parents.map(parent => {
//   const div = buildElement(
//     '<div>',
//     {
//       id: `${parent}-children`,
//       withClass: 'hidden',
//       data: {
//         'id': parent,
//         'withClass': 'bg-red-500 h-14'
//       }
//     }
//   )
//   return {
//     id: `${parent}-children`,
//     div: div 
//   };
// });

// const moduleElements = modules.map(el => {
//   const { label, id, icon, parent, hasChildren, children } = el;
//   const li = buildElement(
//     '<li>', 
//     {
//       id: id,
//       withClass: liClass,
//       data: [
//         {
//           'id': id,
//           'parent': parent,
//           'hasChildren': hasChildren,
//           'children': children
//         }
//       ]
//     }
//   );
  
//   const i = buildElement(
//     '<i>', 
//     {
//       withClass: iClass,
//       icon: icon,
//     }
//   );

//   const p = buildElement(
//     '<p>',
//     {
//       withClass: `${pClass} ${parent && 'pl-9 text-indigo-200 text-sm'}`,
//       text: label,
//     }
//   );

//   const chevron = hasChildren ? buildElement('<i>', {id: `${id}-chevron`, withClass: iClass, icon: 'ri-arrow-down-s-line transition'}) : null;

//   $(li).append([i, p, chevron && chevron]);

//   return li;
// });

// let navMenu = document.getElementById('navMenu');

// moduleElements.forEach(module => {
//   const { id, parent, hasChildren } = $(module).data()[0];

//   if (!parent) {
//     $(navMenu).append(module);
//   } else{
    
//     const childDiv = childDivs.filter(div => {
//       return div.id === `${parent}-children`
//     });
//     console.log(childDiv[0].div[0]);
//     $(`#${parent}-children`).length === 0 && $(navMenu).append(childDiv[0].div[0]);
//     $(`#${parent}-children`).append(module);
//   };

// });