import React from 'react';
import { Link, LinkProps } from 'react-multiple-router';

import { NavRouterMark } from '../config/app-config';

interface NavLinkProps extends LinkProps {
  /** 对应 navRoutersConfig 中的 path 的 component */
  Com: string;
  /** 该页面的名字 */
  Title: string;
  to?: string;
}

/**
 * 用于导航到另外页面的组件
 */
const NavLink: React.SFC<NavLinkProps> = (props) => {
  const { Title, Com, params } = props;
  return (
    <Link {...props} to={NavRouterMark} params={{
      ...params,
      Title,
      Com
    }} />
  );
};

NavLink.defaultProps = {
  className: ''
};

export default NavLink;
