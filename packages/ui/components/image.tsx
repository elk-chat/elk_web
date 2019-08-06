import React from 'react';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Call } from 'basic-helper';
import getFileSrc, { getFileSrcFromCache } from '../utils/get-file-src';

const ImageViwer = ({ src, ID }) => (
  <img className="img" alt="" src={src} onLoad={(e) => {
    if (!window.PinchZoom) return;
    const img = document.querySelector(`#${ID}`);
    const pinch = new PinchZoom.default(img);
  }} id={ID} />
);

const handlePrevImg = (imgSrc, ID) => (e) => {
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
        <span className="close-btn" onClick={() => CloseModal(ModalID)}>x</span>
        <ImageViwer src={imgSrc} ID={`img_${ID}`}/>
      </div>
    )
  });
};

export default (props) => {
  const { FileID, onLoad } = props;
  if (!FileID) return null;
  const ID = FileID.toString();
  const srcFromCacha = getFileSrcFromCache(ID);
  const [imgSrc, setImg] = React.useState(srcFromCacha);
  React.useEffect(() => {
    if (FileID && !srcFromCacha) {
      getFileSrc(FileID).then((fileSrc) => {
        setImg(fileSrc);
      });
    }
  }, [FileID]);
  return (
    <div id={ID} className="img-wrapper" onClick={handlePrevImg(imgSrc, ID)}>
      <img className="_img" alt="" onLoad={(e) => {
        Call(onLoad, e, imgSrc);
      }} src={imgSrc} />
    </div>
  );
};
