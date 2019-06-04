import React, { Component } from 'react';

import { getUrlParams } from 'uke-request/url-resolve';
import { RemoveArrayItem } from 'basic-helper';

import {
  history, wrapPushUrl, pushToHistory, replaceHistory,
  getRouteKey, onNavigate
} from '../utils';

interface RouterHelperProps<P> {
  /** 是否缓存 state */
  cacheState?: boolean;
  /** 最大共存路由 */
  maxRouters: number;
}

interface RouterEntity {
  [propName: string]: {
    params: {
      _R: string;
    };
  };
}

interface RouterState<S> {
  routers: string[];
  routerInfo: RouterEntity;
  activeRouteIdx: number;
  activeRoute: string;
}

const defaultState: RouterState<{}> = {
  routers: [],
  routerInfo: {},
  activeRouteIdx: -1,
  activeRoute: '',
};
let cachedState = Object.assign({}, defaultState);

class RouterHelper<P = {}, S = {}> extends Component<RouterHelperProps<P>, RouterState<S>> {
  history = history;

  wrapPushUrl: Function = wrapPushUrl;

  pushToHistory: Function = pushToHistory;

  onNavigate: Function = onNavigate;

  unlisten: Function | null = null;

  constructor(props: RouterHelperProps<P>) {
    super(props);

    const { cacheState } = props;

    if (this.unlisten) this.unlisten();
    this.unlisten = history.listen(this.handleHistory);

    this.state = cacheState ? cachedState : defaultState;
  }

  componentDidMount() {
    this.initRoute();
  }

  changeRoute = (route: string, params) => {
    onNavigate({
      type: 'PUSH',
      route,
      params
    });
  };

  handleHistory = (location, action) => {
    const { hash, state = {} } = location;
    // const activeRoute = resolvePath(hash)[0];
    const activeRoute = getUrlParams()[getRouteKey()];
    const nextRouterState = state.nextRouters;
    this.selectTab(activeRoute, nextRouterState);
  };

  closeAll = () => {
    replaceHistory('/');
    this.setState(prevState => ({
      ...prevState,
      ...defaultState
    }));
  }

  closeTab = (idx: number) => {
    const { routers, routerInfo, activeRouteIdx } = this.state;

    const targetRoute = routers[idx];
    const nextRouters = RemoveArrayItem(routers, targetRoute);
    const nextRouterInfo = { ...routerInfo };
    delete nextRouterInfo[targetRoute];
    const nextRoutersLen = nextRouters.length - 1;
    const nextActiveIdx = activeRouteIdx > nextRoutersLen ? nextRoutersLen : activeRouteIdx;
    const nextActiveRoute = nextRouters[nextActiveIdx];

    if (!nextActiveRoute) return this.closeAll();

    const nextRouterParams = nextRouterInfo[nextActiveRoute] || {};

    const nextState = {
      routers: nextRouters,
      routerInfo: nextRouterInfo,
      activeRoute: nextActiveRoute,
      activeRouteIdx: nextActiveIdx,
    };

    // pushToHistory(`#/${nextActiveRoute}`, {
    //   type: 'CLOSE',
    //   component: nextActiveRoute,
    //   params: nextRouterInfo,
    //   nextRouters: nextState
    // });
    const config = {
      type: 'PUSH',
      route: nextActiveRoute,
      params: nextRouterParams.params,
      nextRouters: nextState
    };
    // pushToHistory(wrapPushUrl(config), config);
    onNavigate(config);

    return nextState;
  }

  selectTab = (activeRoute: string, nextRouterState?: RouterState): void | null => {
    if (nextRouterState) return this.setState(nextRouterState);
    if (!activeRoute) return null;

    return this.setState(({ routers, routerInfo }) => {
      const { maxRouters } = this.props;
      const currComIdx = routers.indexOf(activeRoute);
      let nextRouters = [...routers];
      const nextRouterInfo = { ...routerInfo };
      nextRouterInfo[activeRoute] = {
        ...(nextRouterInfo[activeRoute] || {}),
        params: getUrlParams()
      };
      let activeIdx = currComIdx;
      if (currComIdx === -1) {
        nextRouters = [...routers, activeRoute];
        /** 做最大路由控制 */
        if (nextRouters.length > maxRouters) {
          const [target, ...other] = nextRouters;
          nextRouters = other;
          delete nextRouterInfo[target];
        }
        activeIdx = nextRouters.length - 1;
      }
      const nextState = {
        activeRoute,
        activeRouteIdx: activeIdx,
        routers: nextRouters,
        routerInfo: nextRouterInfo
      };
      cachedState = nextState;
      return nextState;
    });
  }

  initRoute = () => {
    // let initRoute = resolvePath(location.hash)[0];
    const initRoute = getUrlParams()[getRouteKey()];
    initRoute && this.selectTab(initRoute);
  }
}

export default RouterHelper;
