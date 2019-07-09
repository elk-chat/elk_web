import React from 'react';
import { DownloadFile, GetFileState } from '@little-chat/sdk';
import { UUID } from 'basic-helper';

export default (props) => {
  const { FileID, onLoad } = props;
  const [imgSrc, setImg] = React.useState('');
  const [ID, setID] = React.useState(UUID());
  React.useEffect(() => {
    GetFileState({
      FileID
    }).then((res) => {
      setImg(res.File.URL);
    });
  }, [FileID]);
  return (
    <div id={ID}>
      <img className="img" alt="" onLoad={onLoad} src={imgSrc} />
    </div>
  );
};
