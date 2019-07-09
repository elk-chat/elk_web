import array2obj from './array2obj';

export default function merge(source, target, key) {
  const sourceObj = array2obj(source, key);
  const targetObj = array2obj(target, key);
  function mergeData() {
    const res = {};
    Object.keys(targetObj).forEach((ID) => {
      const targetItem = targetObj[ID];
      const sourceItem = sourceObj[ID];
      res[ID] = Object.assign({}, sourceItem, targetItem);
    });
    return res;
  }
  const nextData = mergeData();
  const resList = Object.values(nextData);
  return resList;
}
