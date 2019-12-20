import Storage from '@mini-code/base-func/storage';
import { HasValue } from '@mini-code/base-func';
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

function userIDFilter(userID) {
  let UserID;
  if (userID) {
    UserID = userID;
  } else {
    UserID = authStore.getState().userInfo.UserID || '';
  }
  return UserID;
}

export function parseToObj(target) {
  let res;
  try {
    res = JSON.parse(target);
  } catch (e) {
    console.log(e);
  }
  return res;
}

export function setStorage(storageKey: string, content: any, userID?) {
  const UserID = userIDFilter(userID);
  if (!HasValue(UserID)) return;

  /** 创建已登陆用户的 Storage */
  if (!StorageCache[UserID]) StorageCache[UserID] = {};

  StorageCache[UserID][storageKey] = JSON.stringify(content);

  Storage.setItem(StorageMark, StorageCache);
}

export function getStorage(storageKey: string, userID?) {
  const UserID = userIDFilter(userID);

  if (!HasValue(UserID)) return null;

  const currStorage = StorageCache[UserID];

  let res;

  if (!currStorage) {
    console.warn(`暂时没有用户 ID 为 ${UserID} 的 Storage`);
  } else if (currStorage[storageKey]) {
    res = parseToObj(currStorage[storageKey]);
  }

  return res;
}

export function rmStorage(storageKey: string, userID?) {
  setStorage(storageKey, null, userID);
}
