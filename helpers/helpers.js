const _ = require('lodash/collection');

const getModules = (mod) => {
  const module = { ...mod };
  delete module.children;

  if (!mod.children || !mod.children.length) {
    return module;
  }

  return [
    module,
    _.flatMapDeep(mod.children, getModules)
  ];
};

const buildElement = (type, options) => {
  const { id, withClass, icon, text } = options;
  
  const element = $(type).addClass(`${icon && icon} ${withClass}`);
  $(element).attr('id', id);
  $(element).text(text);

  if (options.data) {
    options.data.forEach(optionSet => {
      for (key in optionSet) {
        $(element).data(key, optionSet[key]);
      }
    })
  };

  return element;
}

export { getModules, buildElement };