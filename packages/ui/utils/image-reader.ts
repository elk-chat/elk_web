import { UUID } from 'basic-helper';
import setDOMById from 'ukelli-ui/core/set-dom';

interface ReturnParams {
  file?: File | null;
  fileInfo: {
    width: number;
    height: number;
    name: string;
  };
  buffer: string | ArrayBuffer | null;
}

function ImageReader(file: File): Promise<ReturnParams> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const img = new Image();
    const fileInfo = {
      width: 0,
      height: 0,
      name: file.name,
    };
    img.onload = () => {
      fileInfo.height = img.height;
      fileInfo.width = img.width;
      reader.readAsArrayBuffer(file);
    };
    img.src = URL.createObjectURL(file);
    reader.onload = () => {
      const data = reader.result;
      resolve({
        file,
        fileInfo,
        buffer: data
      });
    };
  });
}

const GetImgInfoFormPaste = blob => new Promise<{
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

const GetImgToBuffer = blob => new Promise<string | ArrayBuffer | null>((resolve, reject) => {
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

const GetImgInfo = (
  items: DataTransferItemList
): Promise<ReturnParams> => new Promise((resolve, reject) => {
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
          resolve({
            buffer,
            file: blob,
            fileInfo: {
              ...imgInfo,
              name: fileName || UUID(),
            }
          });
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
