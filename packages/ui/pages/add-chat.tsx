import React, { useState, useEffect } from 'react';
import { CreateChatAndAddMember, AddMemberToChat } from '@little-chat/sdk';
// import { FormLayout } from 'ukelli-ui/core/form-generator';
import { Checkbox } from 'ukelli-ui/core/selector';
import { Button } from 'ukelli-ui/core/button';
import { Input } from 'ukelli-ui/core/form-control';

interface AddChatPanelProps {
  applyAddChat: Function;
  /** 过滤掉的联系人 */
  exclude?: string[];
  /** 点击按钮的回调，如果没有，则调用 CreateChatAndAddMember */
  action?: Function;
  /** 是否需要输入标题 */
  needInput?: boolean;
}

const getValuesForCheckbox = (contactDataList, exclude: string[]) => {
  const res = {};
  contactDataList.forEach((item) => {
    const { UserID, UserName } = item;
    if (exclude.indexOf(UserName) === -1) res[UserID.toString()] = UserName;
  });
  return res;
};

// const checkboxRef = React.createRef();

let checkboxRef;
let inputRef;

const AddChatPanel: React.SFC<AddChatPanelProps> = (props) => {
  const {
    applyAddChat, contactData, userInfo, exclude = [], action, needInput = true
  } = props;
  const contactDataList = contactData.array;

  const checkboxValues = getValuesForCheckbox(contactDataList, [userInfo.UserName, ...exclude]);

  return (
    <div className="add-chat-panel p20">
      {
        needInput && <input
          className="form-control mb20"
          placeholder="群名称"
          ref={(e) => { inputRef = e; }} />
      }
      <div className="mb20">
        <Checkbox
          values={checkboxValues}
          isNum
          onChange={(e) => {}}
          ref={(e) => { checkboxRef = e; }} />
      </div>
      <Button text="确定" onClick={(e) => {
        if (action) {
          action(checkboxRef.value);
        } else {
          CreateChatAndAddMember({
            Title: inputRef.value,
            UserIDs: checkboxRef.value
          }).then((res) => {
            props.onSuccess();
            props.applyFetchChatList();
          }).catch((e) => {
            console.log(e);
          });
        }
      }} />
      {/* {
        contactDataList.map(contact => {
          return (

          )
        })
      } */}
      {/* <FormLayout
        formOptions={formOptions}
        showInputTitle={false}
        btnConfig={[
          {
            text: '确定',
            action: (formRef) => {
              applyAddChat(formRef.value);
            }
          }
        ]} /> */}
    </div>
  );
};

export default AddChatPanel;
