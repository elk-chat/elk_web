interface ReturnParams {
  file: {};
  fileInfo: {
    width: number;
    height: number;
    name: string;
  };
  buffer: ArrayBuffer;
}

export default function (file, isImg = true): Promise<ReturnParams> {
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
    reader.onload = (data) => {
      resolve({
        file,
        fileInfo,
        buffer: reader.result
      });
    };
  });
}
