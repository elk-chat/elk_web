import array2obj from './array2obj';

export default function merge(source, target, key, toString = true) {
  const sourceObj = array2obj(source, key);
  const targetObj = array2obj(target, key);
  function mergeData() {
    const res = {};
    Object.keys(targetObj).forEach((ID) => {
      const targetItem = targetObj[ID];
      const sourceItem = sourceObj[ID];
      res[ID] = Object.assign({}, sourceItem, targetItem);
      if (toString)res[ID][key] = res[ID][key].toString();
    });
    return res;
  }
  const nextData = mergeData();
  const resList = Object.values(nextData);
  return resList;
}
