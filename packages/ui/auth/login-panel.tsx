import React, { Component } from 'react';

import { FormGenerator } from 'ukelli-ui/core/form-generator';
import { TipPanel } from 'ukelli-ui/core/tip-panel';
import { Button } from 'ukelli-ui/core/button';
import { Call } from 'basic-helper/call';
import { tuple } from 'basic-helper/utils/type';
import formOptions from './form-options';
import gradientColorFilter, { gradientColorMapper } from '../components/color';

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
    btnGColor: 'blue',
    fixed: true,
    logo: () => <h2 className="title" style={{
      fontFamily: 'cursive'
    }}>Little chat</h2>
  };

  formHelper!: {
    value: any;
  }

  componentDidMount() {
    Call(this.props.didMount);
    setTimeout(() => this.clickLoginBtn(), 500);
  }

  saveForm = (e: any) => {
    if (e) this.formHelper = e;
  }

  clickLoginBtn = () => {
    /** 自动点击登陆按钮完成登陆操作，方便开发 */
    // if (process.env.NODE_ENV === 'development') document.querySelector('.login-btn').click();
  }

  render() {
    const {
      logging, applyLogin, backgroundImage, btnColor, msg, loginFail,
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
      <div className={`login-panel fixbg${fixed ? ' fixed' : ''}`}
        style={{
          // backgroundImage: `url(/img/login_bg.jpg)`
        }}>
        <div className="login-layout">
          {Call(logo)}
          {
            loginFail && (
              <TipPanel text={msg} type="error" />
            )
          }
          <FormGenerator
            showInputTitle={false}
            formOptions={formOptions}
            ref={this.saveForm}>
            <Button
              onClick={() => {
                applyLogin(this.formHelper.value);
              }}
              disabled={!submitable}
              className="res login-btn"
              style={{
                backgroundImage: gradientColorFilter(btnGColor)
              }}>
              {btnTxt}
            </Button>
          </FormGenerator>
        </div>
      </div>
    );
  }
}
