import { UUID } from '@mini-code/base-func';
import setDOMById from '@deer-ui/core/utils/set-dom';
import { FEContentType } from '@little-chat/core/types';

export interface ImageRenderReturnType {
  file?: File | null;
  contentType?: number;
  fileInfo: {
    width: number;
    height: number;
    name: string;
  };
  buffer: string | ArrayBuffer | null;
}

function ImageReader(file: File): Promise<ImageRenderReturnType> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let readContainer;
    const fileType = file.type;
    const isImg = fileType.indexOf('image') !== -1;
    const isVideo = fileType.indexOf('video') !== -1;
    const onLoaded = () => {
      fileInfo.height = readContainer.height;
      fileInfo.width = readContainer.width;
      reader.readAsArrayBuffer(file);
    };
    if (isImg) {
      readContainer = new Image();
      readContainer.onload = onLoaded;
      readContainer.src = URL.createObjectURL(file);
    } else if (isVideo) {
      readContainer = document.createElement('video');
      readContainer.preload = 'metadata';
      readContainer.onloadedmetadata = onLoaded;
      readContainer.src = URL.createObjectURL(file);
    }
    const fileInfo = {
      width: 0,
      height: 0,
      name: file.name,
    };
    reader.onload = () => {
      const data = reader.result;
      resolve({
        file,
        fileInfo,
        contentType: isImg ? FEContentType.Image : FEContentType.Video,
        buffer: data
      });
    };
  });
}

const GetImgInfoFormPaste = (blob) => new Promise<{
  height: number;
  width: number;
}>((resolve, reject) => {
  if (!blob) {
    reject('need blob');
  } else {
    const imgPrevContainer = setDOMById('IMG_PREV_CONTAINER');
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      const img = document.createElement('img');
      img.onload = (event) => {
        setTimeout(() => {
          resolve({
            height: img.offsetHeight,
            width: img.offsetWidth,
          });
          imgPrevContainer.removeChild(img);
        }, 50);
        // resolve(event);
      };
      img.src = base64Data;
      img.style.opacity = '0';
      imgPrevContainer.appendChild(img);
    };
    reader.readAsDataURL(blob);
  }
});

const GetImgToBuffer = (blob) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    if (!blob) {
      reject('need blob');
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBuffer = reader.result;
        resolve(imageBuffer);
      };
      reader.readAsArrayBuffer(blob);
    }
  });
};

const GetImgInfo = (
  items: DataTransferItemList
): Promise<ImageRenderReturnType> => new Promise((resolve, reject) => {
  let fileName;
  let isImg = false;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.kind === 'string') {
      // eslint-disable-next-line no-loop-func
      item.getAsString((fn) => { fileName = fn; });
    }
    if (item.kind === 'file') {
      isImg = true;
      const blob = item.getAsFile();
      Promise.all([GetImgToBuffer(blob), GetImgInfoFormPaste(blob)])
        // eslint-disable-next-line no-loop-func
        .then(([buffer, imgInfo]) => {
          if (!imgInfo) {
            reject('get img info error');
          } else {
            resolve({
              buffer,
              file: blob,
              contentType: FEContentType.Image,
              fileInfo: {
                height: imgInfo.height,
                width: imgInfo.width,
                name: fileName || UUID(),
              }
            });
          }
        });
    }
  }
  if (!isImg) reject();
});

export {
  ImageReader,
  GetImgToBuffer,
  GetImgInfo,
  GetImgInfoFormPaste
};
