const reduceTargetKeys = (target, keys, predicate) => Object.keys(target).reduce(predicate, {});

export const omit = (target = {}, keys = []) => reduceTargetKeys(
  target,
  keys,
  (acc, key) => (keys.some(omitKey => omitKey === key) ? acc : { ...acc, [key]: target[key] }),
);

export const isFunction = fn => Object.prototype.toString.call(fn) === '[object Function]';

export const isNumber = n => Object.prototype.toString.call(n) === '[object Number]';
