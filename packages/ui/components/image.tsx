import React from 'react';
import { DownloadFile } from '@little-chat/sdk';
import { UUID } from 'basic-helper';

export default (props) => {
  const { FileID, onLoad } = props;
  const [imgSrc, setImg] = React.useState('');
  const [ID, setID] = React.useState(UUID());
  React.useEffect(() => {
    DownloadFile({
      FileID
    }).then((res) => {
      // console.log(res);
      try {
        setImg(`data:image/png;base64,${btoa(String.fromCharCode.apply(null, res.Data))}`);
      } catch (e) {
        console.log(e);
      }
    });
  }, [FileID]);
  return (
    <div id={ID}>
      {/* <img className="img" alt="" onLoad={onLoad} src={imgSrc} /> */}
    </div>
  );
};
