import { GetFileState } from '@little-chat/sdk';
import Storage from '@mini-code/base-func/storage';

const FILE_SRC_CACHE = 'FILE_SRC_CACHE';
const Cache = (() => {
  const cache = Storage.getItem(FILE_SRC_CACHE);
  let res;
  if (cache) {
    try {
      res = JSON.parse(cache);
    } catch (e) {
      res = {};
    }
  }
  return res || {};
})();
/**
 * 返回 File 的 src
 */
const getFileSrc = FileID => new Promise((resolve, reject) => {
  const IDStr = FileID.toString();
  const dataFromCache = Cache[IDStr];
  if (dataFromCache) {
    resolve(dataFromCache);
  } else if (IDStr) {
    GetFileState({
      FileID
    })
      .then(({ File }) => {
        Cache[IDStr] = File.URL;
        Storage.setItem(FILE_SRC_CACHE, Cache);
        resolve(File.URL);
      })
      .catch(reject);
  } else {
    reject('需要传入 FileID');
  }
});

const getFileSrcFromCache = (FileID) => {
  if (FileID && typeof FileID == 'string') {
    return Cache[FileID.toString()];
  }
  return null;
};

export { getFileSrcFromCache };

export default getFileSrc;
