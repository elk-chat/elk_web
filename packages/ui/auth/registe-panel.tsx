import React, { Component } from 'react';

import { FormGenerator } from 'ukelli-ui/core/form-generator';
import { TipPanel } from 'ukelli-ui/core/tip-panel';
import { Button } from 'ukelli-ui/core/button';
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
    this.setState({
      registerRes: res,
      loading: false,
    });
  }

  render() {
    const { loading, registerRes } = this.state;
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
        <div className="login-layout">
          <h2 className="title" style={{
            fontFamily: 'cursive'
          }}>Register in Little Chat</h2>
          {
            !!registerRes.Code && (
              <TipPanel text={registerRes.Message} type="error" />
            )
          }
          <FormGenerator
            showInputTitle={false}
            formOptions={registeFormOptions}
            ref={this.saveForm}>
            <Button
              onClick={() => {
                this.applyRegister(this.formHelper.value);
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
