import React from 'react';
import { Icon } from 'ukelli-ui/core/icon';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Call } from 'basic-helper';

interface EditorProps {
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
  onInput: (event: React.FormEvent<HTMLDivElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClickSendBtn: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onSelectedImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  didMount?: Function;
}

const editorID = 'editorPanel';
const inputID = 'imageFiles';

const Editor = React.forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  const {
    onPaste, onFocus, onInput, onKeyPress, onClickSendBtn,
    onSelectedImg, didMount
  } = props;
  // const [showMoreOptions, setMoreOptions] = React.useState(false);
  React.useEffect(() => {
    Call(didMount, document.querySelector(`#${editorID}`));
  }, []);
  return (
    <div className="editor-panel" id={editorID}>
      <div
        contentEditable
        ref={ref}
        className="typing-area"
        onPaste={onPaste}
        onFocus={onFocus}
        onInput={onInput}
        onKeyPress={onKeyPress} />
      <span className="more-btn item" onClick={(e) => {
        // setMoreOptions(!showMoreOptions);
        const ModalID = ShowModal({
          type: 'side',
          position: 'bottom',
          needHeader: false,
          children: (
            <div className="more-options">
              <div className="item-wrapper" onClick={(e) => {
                document.querySelector(`#${inputID}`).click();
                CloseModal(ModalID);
              }}>
                <div className="item">
                  <Icon n="images"/>
                </div>
                <span className="text">图片</span>
              </div>
            </div>
          )
        });
      }}>
        <Icon n="plus"/>
      </span>
      <span className="send-btn item" onClick={onClickSendBtn}>
        <Icon n="paper-plane"/>
      </span>
      <input
        type="file"
        style={{
          display: 'none'
        }}
        id={inputID}
        onChange={onSelectedImg} />
    </div>
  );
});

export default Editor;
