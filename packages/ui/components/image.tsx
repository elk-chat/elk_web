import React from 'react';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { DownloadFile, GetFileState } from '@little-chat/sdk';
import { Call } from 'basic-helper';

const ImageViwer = ({ src, ID }) => (
  <img className="img" alt="" src={src} onLoad={(e) => {
    if (!window.PinchZoom) return;
    const img = document.querySelector(`#${ID}`);
    const pinch = new PinchZoom.default(img);
  }} id={ID} />
);

export default (props) => {
  const { FileID, onLoad } = props;
  if (!FileID) return null;
  const [imgSrc, setImg] = React.useState('');
  const ID = FileID.toString();
  React.useEffect(() => {
    GetFileState({
      FileID
    }).then((res) => {
      setImg(res.File.URL);
    });
  }, [FileID]);
  return (
    <div id={ID} onClick={(e) => {
      const ModalID = ShowModal({
        width: '100%',
        animation: false,
        clickBgToClose: true,
        modalLayoutDOM: (
          <div
            className="fill img-prev"
            style={{
              zIndex: 999,
              backgroundColor: 'rgba(0,0,0,0.7)',
              // position: 'fixed',
              pointerEvents: 'all'
            }}>
            <span className="close-btn" onClick={e => CloseModal(ModalID)}>x</span>
            <ImageViwer src={imgSrc} ID={`img_${ID}`}/>
          </div>
        )
      });
    }}>
      <img className="img" alt="" onLoad={(e) => {
        Call(onLoad, e);
      }} src={imgSrc} />
    </div>
  );
};
