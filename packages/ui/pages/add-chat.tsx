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

const getValuesForCheckbox = (contactDataList) => {
  const res = {};
  contactDataList.forEach((item) => {
    const { UserID, UserName } = item;
    res[UserID.toString()] = UserName;
  });
  return res;
};

// const checkboxRef = React.createRef();

let checkboxRef;
let inputRef;

const AddChatPanel: React.SFC<AddChatPanelProps> = (props) => {
  const { applyAddChat, contactData } = props;
  const contactDataList = contactData.array;

  const checkboxValues = getValuesForCheckbox(contactDataList);

  return (
    <div className="add-chat-panel p20">
      <input
        className="form-control"
        placeholder="群名称"
        ref={(e) => { inputRef = e; }} />
      <Checkbox
        values={checkboxValues}
        isNum
        onChange={(e) => {}}
        ref={(e) => { checkboxRef = e; }} />
      <Button text="确定" onClick={async (e) => {
        const res = await CreateChatAndAddMember({
          Title: inputRef.value,
          UserIDs: checkboxRef.value
        });
        console.log(res);
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
