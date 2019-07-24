import { GetFileState } from '@little-chat/sdk';

/**
 * 返回 File 的 src
 */
const getFileSrc = FileID => new Promise((resolve, reject) => {
  GetFileState({
    FileID
  })
    .then(({ File }) => {
      resolve(File.URL);
    })
    .catch(reject);
});

export default getFileSrc;
