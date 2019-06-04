import { createBrowserHistory, Location } from "history";
import { wrapReqHashUrl } from 'uke-request/url-resolve';

interface NavigateConfig {
  from?: Location;
  params?: {};
  type: string;
  route: string;
}

const history = createBrowserHistory();

let ROUTE_KEY = '_R';
const changeRouteKey = (routeKey: string) => {
  ROUTE_KEY = routeKey;
};
const getRouteKey = () => ROUTE_KEY;

const pushToHistory = (url: string, params?) => {
  history.push(url.replace(/\/\//g, '/'), params);
};

const replaceHistory = (url: string, params?) => {
  history.replace(url.replace(/\/\//g, '/'), params);
};

const wrapPushUrl = (pushConfig) => {
  const { href, hash } = window.location;
  const targetHash = hash.replace('#/', '').split('?')[0];
  const { component, route, params } = pushConfig;
  const paramsObj = typeof params == 'string' ? { id: params } : { ...params };
  // let paramsStr = '';
  // let otherParams = {...paramsObj};
  // for (const key in otherParams) {
  //   const val = otherParams[key];
  //   paramsStr += `${key}=${val}&&`;
  // }
  let result = wrapReqHashUrl({
    params: {
      [ROUTE_KEY]: route || component,
      ...paramsObj
    },
    toBase64: false
  });
  // let result = `${ROUTE_KEY}=${route || component}/${id}${paramsStr ? ('?' + paramsStr) : ''}`;
  // let result = `/${route}/${id}${paramsStr ? ('?' + paramsStr) : ''}`;
  result = `${targetHash}${result.replace(/&&$/g, '')}`;
  return result;
};

/**
 *
 * @param {object} config { type: 'PUSH | GO_BACK | LINK', component: route, params: {} }
 */
const onNavigate = (config: NavigateConfig): void => {
  if (!config) return console.log('Not config');
  const { location } = history;
  config.from = location;
  switch (config.type) {
    case "PUSH":
      pushToHistory(`#/${wrapPushUrl(config)}`, config);
      break;
    case "LINK":
      break;
    // case "MODAL":
    //   ShowModal({
    //     ...config,
    //     showFuncBtn: false
    //   })
    //   break;
    case "GO_BACK":
      history.goBack();
      break;
  }
};

export {
  history,
  wrapPushUrl,
  pushToHistory,
  changeRouteKey,
  replaceHistory,
  getRouteKey,
  onNavigate,
};
