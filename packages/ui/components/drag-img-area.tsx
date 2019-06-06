import React, { Component } from 'react';

import { GenerateThumbs } from '../utils/thumb-img-generator';

const generateThumb = new GenerateThumbs();

export default class DragImgArea extends Component {
  bindDragEnevt: boolean = false;

  componentWillUnmount() {
    this.removeDropEvent();
  }

  dragenterEvent = (e) => {
    e.preventDefault();
  }

  dragleaveEvent = (e) => {
    e.preventDefault();
  }

  dragoverEvent = (e) => {
    e.preventDefault();
  }

  drogEvent = (e) => {
    e.preventDefault();

    const fileList = e.dataTransfer.files;

    this.chooseFile(fileList);
  }

  onCancelPic = () => {
    this.toggleDragArea(false);
    this.onClearAllPic();
  }

  onClearAllPic = () => {
    const { previewGroup } = this;
    previewGroup.innerHTML = '';
    this.planningImgList = [];
    generateThumb.clearFileList();
  }

  addFileFromInput = (e) => {
    // console.log(e.target.files);
    if (e.target.files.length === 0) return;
    this.chooseFile(e.target.files);
  }

  addFile() {
    this.toggleDragArea(true);
  }

  chooseFile(fileList) {
    if (!fileList && fileList[0].type.indexOf('image') === -1) return;

    generateThumb.onLoad = (base64Data, fileId) => {
      this.planningImgList.push(base64Data);
      const img = this.convertBase64ToImg(base64Data);
      this.addImgToPanel(img);
    };
    generateThumb.addFileList(fileList);
    generateThumb.generates();
  }

  removeDropEvent = () => {
    const elem = this.drapPanel;
    if (!elem || !this.bindDragEnevt) return;
    elem.removeEventListener('dragenter', this.dragenterEvent, false);
    elem.removeEventListener('dragleave', this.dragleaveEvent, false);
    elem.removeEventListener('dragover', this.dragoverEvent, false);
    elem.removeEventListener('drop', this.drogEvent, false);
    this.bindDragEnevt = false;
  }

  addDropEvent = (elem: HTMLElement) => {
    if (!elem || this.bindDragEnevt) return;
    elem.addEventListener('dragenter', this.dragenterEvent, false);
    elem.addEventListener('dragleave', this.dragleaveEvent, false);
    elem.addEventListener('dragover', this.dragoverEvent, false);
    elem.addEventListener('drop', this.drogEvent, false);
    this.drapPanel = elem;
    this.bindDragEnevt = true;
  }

  render() {
    return (
      <div className="drap-panel">
        <div className="drap-area" ref={this.addDropEvent} />>
        <span className="tip">将图片拖到此区域</span>
        <div id="previewGroup" ref={e => this.previewGroup = e} />
        <div className="action">
          <button className="btn hola primary" onClick={this._onSendImage}>
            发送
          </button>
          <span className="btn hola default" onClick={this.onCancelPic}>取消</span>
          <span className="btn hola default" onClick={this.onClearAllPic}>清空</span>
          <span className="image-button btn hola default">
            选择文件
            <input className="btn hola default" type="file" onChange={this.addFileFromInput}/>
          </span>
        </div>
      </div>
    );
  }
}
