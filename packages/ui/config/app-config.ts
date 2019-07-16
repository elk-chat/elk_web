const NavRouterMark = "N";

const APP_VERSION = '4';
const APP_VERSION_STORAGE = 'APP_VERSION_STORAGE';

const appVersion = localStorage.getItem(APP_VERSION_STORAGE);
if (appVersion !== APP_VERSION) {
  /**
   * 如果用户运行时的客户端版本配置与最新客户端版本要求的不一致，则清空 localStorage
   */
  localStorage.clear();
}
localStorage.setItem(APP_VERSION_STORAGE, APP_VERSION);

window.onerror = (event) => {
  alert(JSON.stringify(event));
};

export {
  NavRouterMark
};
