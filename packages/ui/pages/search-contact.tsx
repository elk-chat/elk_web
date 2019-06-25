import React from 'react';
import { FormGenerator } from 'ukelli-ui/core/form-generator';
import { Loading } from 'ukelli-ui/core/loading';
import { SearchUser } from '@little-chat/sdk';

import Link from '../components/nav-link';

interface SearchContactProps {
}

export default class SearchContact extends React.Component<SearchContactProps> {
  state = {
    searchRes: [],
    searching: false
  }

  formOptions = [
    {
      type: 'input',
      title: '用户名',
      defaultValue: 'user1',
      ref: 'UserName',
      inputBtnConfig: {
        text: '搜索',
        action: (inputDOM) => {
          this.setState({
            searching: true
          });
          this.searchContact({
            UserName: inputDOM.value
          });
        }
      },
    }
  ]

  searchContact = async (options) => {
    const { Users } = await SearchUser({ Condition: options });
    this.setState({
      searchRes: Users,
      searching: false
    });
  }

  render() {
    // const { } = this.props;
    const { searchRes, searching } = this.state;
    const hasRes = searchRes.length > 0;

    return (
      <div className="discover-page action-group">
        <Loading loading={searching} inrow />
        <FormGenerator
          showInputTitle={false}
          formOptions={this.formOptions} />
        {
          hasRes && (
            <div className="search-res-container">
              <div className="list">
                {
                  searchRes.map((item) => {
                    const { UserName, UserID } = item;
                    return (
                      <Link
                        Com="ContactDetail"
                        Title={UserName}
                        params={item}
                        className="list-item"
                        key={UserID}>
                        {UserName}
                      </Link>
                    );
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
