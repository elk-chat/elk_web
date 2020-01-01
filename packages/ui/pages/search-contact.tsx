import React from 'react';
import { FormGenerator } from '@deer-ui/core/form-generator';
import { Loading } from '@deer-ui/core/loading';
import { SearchUser } from '@little-chat/sdk';

import { Call } from '@mini-code/base-func';
import Link from '../components/nav-link';
import Avatar from '../components/avatar';

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
      ref: 'UserName',
      inputBtnConfig: {
        text: '搜索',
        action: (inputDOM) => {
          this.setState({
            searching: true
          });
          this.searchContact({
            UserName: inputDOM.value,
          });
        }
      },
    }
  ]

  searchContact = async (options) => {
    if (this.state.searching) return;
    const { Users } = await SearchUser({
      Condition: options,
      Paging: {
        AllCount: 0,
        PageIndex: 0,
        PageSize: 10,
      }
    });
    this.setState({
      searchRes: Users,
      searching: false
    });
  }

  render() {
    const { ActionComponent = Link, onAction } = this.props;
    const { searchRes, searching } = this.state;
    const hasRes = searchRes.length > 0;

    return (
      <div className="discover-page action-group">
        <Loading loading={searching} inrow />
        <FormGenerator
          formOptions={this.formOptions}
          layout="vertical"
        />
        {
          hasRes && (
            <div className="search-res-container">
              <div className="list">
                {
                  searchRes.map((item) => {
                    const { UserName, UserID, AvatarFileID } = item;
                    const userID = UserID.toString();
                    return (
                      <ActionComponent
                        Com="ContactDetail"
                        Title={UserName}
                        params={{
                          UserName,
                          UserID: userID
                        }}
                        className="list-item layout a-i-c _btn"
                        onClick={(e) => {
                          Call(onAction, item);
                        }}
                        key={userID}
                      >
                        <Avatar size={50} AvatarFileID={AvatarFileID} text={UserName[0]} />
                        <span className="ms10">
                          {UserName}
                        </span>
                      </ActionComponent>
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
