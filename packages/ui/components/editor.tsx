import React from 'react';
import { Icon } from 'ukelli-ui/core/icon';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Call } from 'basic-helper';

interface EditorProps {
  onPaste: React.ClipboardEvent;
  onFocus: React.FocusEvent;
  onInput: React.FormEvent;
  onKeyPress: React.KeyboardEvent;
  onClickSendBtn: React.MouseEvent;
  onSelectedImg: React.ChangeEvent;
  didMount?: Function;
}

const Editor: React.RefForwardingComponent<EditorProps> = React.forwardRef((props, ref) => {
  const {
    onPaste, onFocus, onInput, onKeyPress, onClickSendBtn, onSelectedImg,
    didMount
  } = props;
  const [showMoreOptions, setMoreOptions] = React.useState(false);
  React.useEffect(() => {
    Call(didMount);
  }, [didMount]);
  return (
    <div className={`editor-panel${showMoreOptions ? ' show-more' : ''}`}>
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
              <div className="item-wrapper">
                <div className="item">
                  <Icon n="images" onClick={(e) => {
                    document.querySelector('#imageFiles').click();
                    CloseModal(ModalID);
                  }}/>
                </div>
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
        }} id="imageFiles"
        onChange={onSelectedImg} />
      {/* <div className="more-options">
        <div className="item">
          <Icon n="images"/>
        </div>
      </div> */}
    </div>
  );
});

export default Editor;
