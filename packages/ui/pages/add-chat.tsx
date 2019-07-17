import React, { useState, useEffect } from 'react';
import { CreateChatAndAddMember } from '@little-chat/sdk';
// import { FormLayout } from 'ukelli-ui/core/form-generator';
import { Checkbox } from 'ukelli-ui/core/selector';
import { Button } from 'ukelli-ui/core/button';
import { Input } from 'ukelli-ui/core/form-control';

interface AddChatPanelProps {
  applyAddChat: Function;
}

// const formOptions = [
//   {
//     title: '用户ID',
//     ref: 'UserID',
//     type: 'input',
//   },
//   {
//     title: 'Chat 名称',
//     ref: 'Title',
//     type: 'input',
//   },
// ];

const getValuesForCheckbox = (contactDataList, myName) => {
  const res = {};
  contactDataList.forEach((item) => {
    const { UserID, UserName } = item;
    if (UserName !== myName) res[UserID.toString()] = UserName;
  });
  return res;
};

// const checkboxRef = React.createRef();

let checkboxRef;
let inputRef;

const AddChatPanel: React.SFC<AddChatPanelProps> = (props) => {
  const { applyAddChat, contactData, userInfo } = props;
  const contactDataList = contactData.array;

  const checkboxValues = getValuesForCheckbox(contactDataList, userInfo.UserName);

  return (
    <div className="add-chat-panel p20">
      <input
        className="form-control mb20"
        placeholder="群名称"
        ref={(e) => { inputRef = e; }} />
      <div className="mb20">
        <Checkbox
          values={checkboxValues}
          isNum
          onChange={(e) => {}}
          ref={(e) => { checkboxRef = e; }} />
      </div>
      <Button text="确定" onClick={(e) => {
        CreateChatAndAddMember({
          Title: inputRef.value,
          UserIDs: checkboxRef.value
        }).then((res) => {
          console.log(res);
          props.onSuccess();
        }).catch((e) => {
          console.log(e);
        });
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
