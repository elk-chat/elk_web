function array2obj(array: {}[], objKey: string) {
  const res = {};
  array.forEach((item) => { res[item[objKey]] = item; });
  return res;
}

export default array2obj;
