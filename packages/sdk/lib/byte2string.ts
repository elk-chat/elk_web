function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  let str = '';
  const _arr = arr;
  for (let i = 0; i < _arr.length; i++) {
    const one = _arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      const bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

export default byteToString;
