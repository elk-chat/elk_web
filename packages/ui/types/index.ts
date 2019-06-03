export interface RouteEntity {
  /** 路径 */
  path: string;
  /** 内容 */
  text?: string;
  /** icon, [0] 为普通状态, [1] 为激活状态 */
  icon?: string[];
  /** 未读数 */
  unreadCount?: number;
  /** 路由是否必须吻合 */
  exact?: boolean;
  /** 是否不需要 padding */
  noPadding?: boolean;
  /** component */
  component?: any;
  /** render */
  render?: Function;
}
