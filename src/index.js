import { liClass, iClass, pClass } from "../helpers/classes";
import { getModules, buildElement } from "../helpers/helpers";
import { navModules } from "../helpers/exampleData";
const _ = require('lodash/collection');

const modules = _.flatMapDeep(navModules, getModules);

const allParents = modules.filter(module => {
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

const moduleElements = modules.map(el => {
  const { label, id, icon, parent, hasChildren, children } = el;
  const li = buildElement(
    '<li>', 
    {
      id: id,
      withClass: liClass,
      data: [
        {
          'id': id,
          'parent': parent,
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
      withClass: `${pClass} ${parent && 'pl-9 text-indigo-200 text-sm'}`,
      text: label,
    }
  );
  $(li).append([i, p]);

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
    console.log(childDiv[0].div[0]);
    $(`#${parent}-children`).length === 0 && $(navMenu).append(childDiv[0].div[0]);
    $(`#${parent}-children`).append(module);
  };

});

$('.nav').on('click', function(e) {
  console.log($(this).data()[0]);
  const { id, hasChildren } = $(this).data()[0];
  hasChildren && $(`#${id}-children`).toggleClass('hidden');
});