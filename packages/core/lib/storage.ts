import Storage from 'basic-helper/storage';
import { authStore } from '../actions/auth-action';

interface StorageCacheStruct {
  [UserID: string]: {};
}

const StorageMark = "CHAT_STATE_STORAGE";
const storageItem = Storage.getItem(StorageMark);
let StorageCache: StorageCacheStruct = {};
if (storageItem) {
  try {
    StorageCache = JSON.parse(storageItem);
  } catch (e) {
    console.log(e);
  }
}

export function setStorage(storageKey: string, content: any) {
  const { UserID } = authStore.getState().userInfo;

  /** 创建已登陆用户的 Storage */
  if (!StorageCache[UserID]) StorageCache[UserID] = {};

  StorageCache[UserID][storageKey] = JSON.stringify(content);

  Storage.setItem(StorageMark, StorageCache);
}

export function getStorage(storageKey: string) {
  const { UserID } = authStore.getState().userInfo;

  const currStorage = StorageCache[UserID];

  let res;

  if (!currStorage) {
    console.warn(`暂时没有用户 ID 为 ${UserID} 的 Storage`);
  } else {
    try {
      res = currStorage[storageKey];
    } catch (e) {
      console.log(e);
    }
  }

  return res;
}
