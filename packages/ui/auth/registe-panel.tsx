import React, { Component } from 'react';

import { FormGenerator } from 'ukelli-ui/core/form-generator';
import { TipPanel } from 'ukelli-ui/core/tip-panel';
import { Button } from 'ukelli-ui/core/button';
import { Toast } from 'ukelli-ui/core/toast';
import { Call } from 'basic-helper/call';
import { tuple } from 'basic-helper/utils/type';
import { ApplyRegister } from '@little-chat/sdk';
import { registeFormOptions } from './form-options';
import gradientColorFilter, { gradientColorMapper } from '../components/color';

const btnGColorTypes = tuple(...Object.keys(gradientColorMapper));
type btnGColor = (typeof btnGColorTypes)[number];

export default class RegisterPanel extends Component<{}, {}> {
  static defaultProps = {
    btnGColor: 'blue',
    logo: () => <h2 className="title" style={{
      fontFamily: 'cursive'
    }}>Register in Little Chat</h2>
  };

  state = {
    registerRes: {},
    loading: false
  }

  toast;

  autoLoginTime = 2;

  formHelper!: {
    value: any;
  }

  saveForm = (e: any) => {
    if (e) this.formHelper = e;
  }

  applyRegister = async (form) => {
    this.setState({
      loading: true,
    });
    let res;
    try {
      res = await ApplyRegister(form);
    } catch (e) {
      // console.log(e);
      res = e;
    }
    const isSuccess = !res.Code;
    if (isSuccess) {
      this.toast.show(`注册成功，将在 ${this.autoLoginTime} 秒后自动登陆`, 'success');
      setTimeout(() => {
        this.props.applyLogin(form);
      }, this.autoLoginTime * 1000);
    } else {
      this.toast.show(res.Message, 'error');
    }
    this.setState({
      registerRes: res,
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    const submitable = !loading;
    let btnTxt;
    switch (true) {
      case loading:
        btnTxt = '注册中...';
        break;
      default:
        btnTxt = '注册';
        break;
    }
    return (
      <div className="login-panel fixbg fixed"
        style={{
          // backgroundImage: `url(/img/login_bg.jpg)`
        }}>
        <Toast ref={(e) => { this.toast = e; }} />
        <div className="login-layout">
          <h2 className="title" style={{
            fontFamily: 'cursive'
          }}>Register in Little Chat</h2>
          <FormGenerator
            showInputTitle={false}
            formOptions={registeFormOptions}
            ref={this.saveForm}>
            <Button
              onClick={() => {
                const checkRes = this.formHelper.checkForm();
                if (checkRes.isPass) {
                  this.applyRegister(this.formHelper.value);
                } else {
                  this.toast.show(`请输入${checkRes.desc}`, 'error');
                }
              }}
              disabled={!submitable}
              className="res login-btn"
              style={{
                backgroundImage: gradientColorFilter('red')
              }}>
              {btnTxt}
            </Button>
          </FormGenerator>
        </div>
      </div>
    );
  }
}
