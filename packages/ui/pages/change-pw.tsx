import React from 'react';
import { FormLayout } from '@deer-ui/core/form-layout';
import { FormOptions } from '@deer-ui/core/form-generator/form-generator';
import { FormLayoutBtnsConfig } from '@deer-ui/core/form-layout/form-layout';
import { Notify } from '@deer-ui/core/notification';
import { ChangePassword } from '@little-chat/sdk';

interface ChangePWPageProps {

}

const formOptions: FormOptions = [
  {
    type: 'input',
    ref: 'OldPassword',
    title: '旧密码'
  },
  {
    type: 'input',
    ref: 'NewPassword1',
    title: '新密码'
  },
  {
    type: 'input',
    ref: 'NewPassword2',
    title: '确认新密码'
  },
];

const formBtnConfig: FormLayoutBtnsConfig = [
  {
    text: '确认修改',
    action: (formRef) => {
      const { OldPassword, NewPassword1, NewPassword2 } = formRef.value;
      if (!OldPassword) {
        return Notify({
          title: '请输入旧密码',
          type: 'error'
        });
      }
      if (NewPassword1 !== NewPassword2) {
        return Notify({
          title: '两次密码不一致，请检查',
          type: 'error'
        });
      }
      console.log({
        OldPassword,
        NewPassword: NewPassword2
      })
      ChangePassword({
        OldPassword,
        NewPassword: NewPassword2
      }).then((res) => {
        Notify({
          title: '修改成功，请重新登陆',
          type: 'success'
        });
      }).catch((err) => {
        Notify({
          title: '修改失败',
          text: err.Message,
          type: 'error'
        });
      });
    }
  }
];

const ChangePWPage: React.SFC<ChangePWPageProps> = (props) => {
  const { } = props;
  return (
    <div className="change-pw-page">
      <FormLayout formOptions={formOptions} btnConfig={formBtnConfig} />
    </div>
  );
};

export default ChangePWPage;
