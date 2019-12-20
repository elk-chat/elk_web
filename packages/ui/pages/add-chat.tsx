import React, { useState, useEffect } from 'react';
import { CreateChatAndAddMember, AddMemberToChat } from '@little-chat/sdk';
// import { FormLayout } from '@deer-ui/core/form-generator';
import { Checkbox } from '@deer-ui/core/checkbox';
import { Button } from '@deer-ui/core/button';
import { Toast } from '@deer-ui/core/toast';

interface AddChatPanelProps {
  /** 过滤掉的联系人 */
  exclude?: string[];
  /** 点击按钮的回调，如果没有，则调用 CreateChatAndAddMember */
  action?: (values: [], valuesObj: {
    [val: string]: string;
  }) => Promise<{}>;
  /** 是否需要输入标题 */
  needInput?: boolean;
  /** onSuccess */
  onSuccess?: () => void;
}

const getValuesForCheckbox = (contactDataList, exclude: string[]) => {
  const res = {};
  contactDataList.forEach((item) => {
    const { UserID, UserName } = item;
    if (exclude.indexOf(UserName) === -1) res[UserID.toString()] = UserName;
  });
  return res;
};

let checkboxRef;
let inputRef;
let toastRef;

const AddChatPanel: React.SFC<AddChatPanelProps> = (props) => {
  const {
    contactData, userInfo, exclude = [], action, needInput = true, onSuccess
  } = props;
  const contactDataList = contactData.array;

  const checkboxValues = getValuesForCheckbox(contactDataList, [userInfo.UserName, ...exclude]);
  const hasOptions = Object.keys(checkboxValues).length > 0;

  const [loading, setLoading] = useState(false);

  useEffect(() => () => {
    checkboxRef = null;
    inputRef = null;
    toastRef = null;
  }, []);

  return hasOptions ? (
    <div className="add-chat-panel p20">
      <Toast ref={(e) => {
        toastRef = e;
      }} />
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
      <Button text="确定" loading={loading} onClick={(e) => {
        setLoading(true);
        if (action) {
          action(checkboxRef.value, checkboxRef.valuesObj)
            .catch((err) => {
              toastRef && toastRef.show(err.Message, 'error');
              setLoading(false);
            });
        } else {
          CreateChatAndAddMember({
            Title: inputRef.value,
            UserIDs: checkboxRef.value
          })
            .then((res) => {
              onSuccess && onSuccess();
              props.applyFetchChatList();
            })
            .catch((err) => {
              toastRef && toastRef.show(err.Message, 'error');
              setLoading(false);
            });
        }
      }} />
    </div>
  ) : <div className="p20">没有更多联系人了</div>;
};

export default AddChatPanel;
