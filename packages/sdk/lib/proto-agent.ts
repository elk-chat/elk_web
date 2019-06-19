import { encodeData, decodeData } from './date-buffer';

interface Api {
  create: ({}) => {};
  encode: ({}) => ({
    finish: () => Uint8Array;
  });
  decode: (Uint8Array) => {};
  toObject: (any) => {};
}

function encodeAgent<T extends Api>(api: T, data: {}, apiName: string): ArrayBuffer {
  const postData = api.create(data);
  const bufData = api.encode(postData).finish();

  const finalData = encodeData(apiName, bufData);

  return finalData;
}
function decodeAgent(data: ArrayBuffer) {
  const res = decodeData(data);

  return res;
}

export {
  encodeAgent, decodeAgent
};
