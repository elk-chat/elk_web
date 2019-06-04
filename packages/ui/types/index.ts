export interface RouteEntity {
  /** 路径 */
  path: string;
  /** 内容 */
  text?: string;
  /** 未读数 */
  unreadCount?: number;
  /** 路由是否必须吻合 */
  exact?: boolean;
  icon?: string[] | {}[];
  /** 是否不需要 padding */
  noPadding?: boolean;
  /** component */
  component?: any;
  /** render */
  render?: Function;
}
