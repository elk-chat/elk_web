import React, { Component } from 'react';

import { FormLayout } from 'ukelli-ui';
import { Call } from 'basic-helper/call';
import { tuple } from '../utils/type';
import formOptions from './form-options';

const gradientColorMapper: object = {
  red: 'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
  green: 'linear-gradient(120deg, #2af598 0%, #009efd 100%)',
  blue: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
  wine: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};
const gradientColorFilter = (color: string) => gradientColorMapper[color] || color;

const btnGColorTypes = tuple(...Object.keys(gradientColorMapper));
type btnGColor = (typeof btnGColorTypes)[number];

export interface LoginPanelProps {
  /** 是否登陆中 */
  logging?: boolean;
  /** 是否自动登陆中 */
  autoLoging?: boolean;
  /** 登陆的回调 */
  applyLogin: Function;
  /** 登陆的 logo */
  logo?: Function;
  /** didMount 回调 */
  didMount?: Function;
  /** 登陆框的背景图 */
  backgroundImage?: string;
  /** 按钮的颜色，请参考 UI 库 Button 的配色方案 */
  btnColor?: string;
  /** 按钮的渐变颜色 */
  btnGColor?: btnGColor;
  /** 是否沾满屏幕 */
  fixed?: boolean;
}

export default class LoginPanel extends Component<LoginPanelProps> {
  static defaultProps = {
    logging: false,
    autoLoging: false,
    btnGColor: 'red',
    fixed: true,
    logo: () => <h3 className="title">Little chat</h3>
  };

  formHelper = null

  componentDidMount() {
    Call(this.props.didMount);
  }

  saveForm = (e: React.ReactElement) => {
    if (e && e.formHelper) this.formHelper = e.formHelper;
  }

  render() {
    const {
      logging, applyLogin, backgroundImage, btnColor,
      autoLoging, logo, fixed, btnGColor
    } = this.props;
    const submitable = !autoLoging && !logging;
    let btnTxt;
    switch (true) {
      case autoLoging:
        btnTxt = '自动登陆中...';
        break;
      case logging:
        btnTxt = '登陆中...';
        break;
      default:
        btnTxt = '登陆';
        break;
    }
    return (
      <div className={`login-panel fixbg ${fixed ? 'fixed' : ''}`}
        style={{
          backgroundImage
        }}>
        <div className="login-layout">
          {Call(logo)}
          <FormLayout
            // className="login"
            btnConfig={[
              {
                style: btnGColor ? {
                  backgroundImage: gradientColorFilter(btnGColor)
                } : null,
                type: 'submit',
                text: btnTxt,
                className: 'res login-btn',
                color: btnColor,
                action: submitable ? () => {
                  applyLogin(this.formHelper.value);
                } : null
              }
            ]}
            // onSubmit={e => {
            //   login(this.formHelper.value);
            // }}
            formOptions={formOptions}
            ref={this.saveForm} />
        </div>
      </div>
    );
  }
}
