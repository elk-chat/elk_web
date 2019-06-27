const loginFormOptions = [
  {
    ref: 'UserName',
    type: 'input',
    defaultValue: 'alex',
    title: '账号',
    iconName: 'account',
    required: true
  },
  {
    ref: 'Password',
    type: 'password',
    defaultValue: '123',
    title: '密码',
    iconName: 'lock',
    required: true
  },
  // {
  //   ref: 'GooglePassword',
  //   type: 'input',
  //   iconName: 'security',
  //   title: 'Google认证码',
  //   // required: true
  // }
];

const registeFormOptions = [
  {
    ref: 'UserName',
    type: 'input',
    title: '账号',
    iconName: 'account',
    required: true
  },
  {
    ref: 'Password',
    type: 'password',
    title: '密码',
    iconName: 'lock',
    required: true
  },
];

export {
  loginFormOptions,
  registeFormOptions,
};
