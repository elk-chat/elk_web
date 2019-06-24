import React from 'react';
import { FormLayout } from 'ukelli-ui/core/form-generator';
import { SearchUser } from '@little-chat/sdk';

import Link from '../components/nav-link';

interface SearchContactProps {
}

export default class SearchContact extends React.Component<SearchContactProps> {
  formOptions = [
    {
      type: 'input',
      title: '用户名',
      defaultValue: 'user1',
      ref: 'UserName'
    }
  ]

  btnConfig = [
    {
      text: '搜索',
      action: (formRef) => {
        this.searchContact(formRef.value);
      }
    }
  ]

  searchContact = async (options) => {
    const searchRes = await SearchUser({ Condition: options });
    console.log(searchRes);
  }

  render() {
    const { } = this.props;

    return (
      <div className="discover-page action-group">
        <FormLayout
          formOptions={this.formOptions}
          btnConfig={this.btnConfig} />
      </div>
    );
  }
}
