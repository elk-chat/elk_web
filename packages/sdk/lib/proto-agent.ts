interface Api {
  create: ({}) => {};
  encode: ({}) => ({
    finish: () => Uint8Array;
  });
  decode: (Uint8Array) => {};
  toObject: (any) => {};
}

function encodeAgent<T extends Api>(api: T, data: {}): Uint8Array {
  const postData = api.create(data);
  const bufData = api.encode(postData).finish();

  return bufData;
}
function decodeAgent<T extends Api>(api: T, buf: Uint8Array) {
  const msgData = api.decode(buf);
  const objData = api.toObject(msgData);

  return objData;
}

export {
  encodeAgent, decodeAgent
};
