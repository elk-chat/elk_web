import { Call } from 'basic-helper';

const THUMBMAXWIDTH = 800;

export class GenerateThumbs {
  generatedFiles: {} = {};

  fileList = {};

  onLoad = (base64Data: string, fileID: string) => {};

  addFileList(fileList) {
    if (!fileList && fileList.length === 0) return;
    this.fileList = fileList;
  }

  generates() {
    for (const file in this.fileList) {
      if (this.fileList.hasOwnProperty(file)) {
        this._generate(this.fileList[file]);
      }
    }
  }

  clearFileList() {
    this.generatedFiles = {};
  }

  private _generate = (file) => {
    if (!file) return;


    const reader = new FileReader();
    let _targetW;
    let _targetH;

    reader.onloadend = (evt) => {
      const img = new Image();

      img.onload = () => {
        const thumbContainer = document.createElement('canvas');
        const ctx = thumbContainer.getContext('2d');
        if (img.width > THUMBMAXWIDTH) {
          _targetH = img.height * (THUMBMAXWIDTH / img.width);
          _targetW = THUMBMAXWIDTH;
        } else {
          _targetH = img.height;
          _targetW = img.width;
        }

        const fileId = `${file.lastModified + file.name}&size-${_targetW}x${_targetH}`;

        img.width = thumbContainer.width = _targetW;
        img.height = thumbContainer.height = _targetH;
        ctx.drawImage(img, 0, 0, _targetW, _targetH);
        const _base64 = thumbContainer.toDataURL(file.type, 0.9);

        this.generatedFiles[fileId] = _base64;

        Call(this.onLoad, _base64, fileId);
      };

      img.src = evt.result;
    };

    reader.readAsDataURL(file);
  }
}

export function generateThumb() {
  return new GenerateThumbs();
}
