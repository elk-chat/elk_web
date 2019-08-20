import React, { useEffect, useState } from 'react';
import { Icon } from 'ukelli-ui/core/icon';
import { DropdownWrapper } from 'ukelli-ui/core/selector';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Call } from 'basic-helper';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

interface EditorProps {
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
  onInput?: (event: React.FormEvent<HTMLDivElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClickSendBtn: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onSelectedImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  didMount?: Function;
}

const emojiPickerZHCN = {
  search: '搜索',
  clear: '清除', // Accessible label on "clear" button
  notfound: '没找到 Emoji',
  skintext: '设置皮肤',
  categories: {
    search: '搜索结果',
    recent: '常用',
    people: '表情符号 & 人物',
    nature: '动物 & 自然',
    foods: '食物 & 饮料',
    activity: '活动',
    places: '旅游 & 地点',
    objects: '物体',
    symbols: '符号',
    flags: '旗帜',
    custom: '自定义',
  },
  categorieslabel: 'Emoji 类型', // Accessible title for the list of categories
  skintones: {
    1: '默认皮肤',
    2: '白色皮肤',
    3: '灰度皮肤',
    4: '偏灰皮肤',
    5: '偏黑皮肤',
    6: '黑色皮肤',
  },
};

const editorID = 'editorPanel';
const inputID = 'imageFiles';
let editorRef;

const Editor = React.forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  const {
    onPaste, onFocus, onInput, onKeyPress, onClickSendBtn,
    onSelectedImg, didMount
  } = props;
  // const [showFace, setShowFace] = useState(false);
  // const [showMoreOptions, setMoreOptions] = React.useState(false);
  useEffect(() => {
    Call(didMount, document.querySelector(`#${editorID}`));
  }, []);
  return (
    <div className="editor-panel" id={editorID}>
      <DropdownWrapper
        position="top"
        overlay={e => (
          <Picker
            i18n={emojiPickerZHCN}
            onSelect={(emojiEvent) => {
              editorRef.textContent += emojiEvent.native;
            }} />
        )}>
        <span className="face-picker"
          onClick={(e) => {
          // setShowFace(true);
          }}>
          <Icon n="surprise" s="r" />
        </span>
      </DropdownWrapper>
      <div
        contentEditable
        ref={(e) => {
          editorRef = e;
          if (ref) ref.current = e;
        }}
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
        <Icon n="plus" />
      </span>
      <span className="send-btn item" onClick={onClickSendBtn}>
        <Icon n="paper-plane" />
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
