import React from 'react';
import { FormLayout } from 'ukelli-ui/core/form-generator';

interface ChatDetailProps {
  applyAddChat: Function;
}

const formOptions = [
  {
    title: '用户ID',
    ref: 'UserID',
    type: 'input',
  },
  {
    title: 'Chat 名称',
    ref: 'Title',
    type: 'input',
  },
];

const ChatDetail: React.SFC<ChatDetailProps> = (props) => {
  const { applyAddChat } = props;
  return (
    <div className="add-chat-panel">
      <FormLayout
        formOptions={formOptions}
        showInputTitle={false}
        btnConfig={[
          {
            text: '确定',
            action: (formRef) => {
              applyAddChat(formRef.value);
            }
          }
        ]} />
    </div>
  );
};

export default ChatDetail;
