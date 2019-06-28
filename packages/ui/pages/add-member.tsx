import React from 'react';
import { AddMemberToChat } from '@little-chat/sdk';

const formOptions = [
  {
    type: 'input',
    ref: 'UserID',
  }
];

export default (props) => {
  const { FileID, onLoad } = props;
  const [imgSrc, setImg] = React.useState('');
  React.useEffect(() => {
    AddMemberToChat({
      FileID
    }).then((res) => {
      // console.log(res);
      setImg(`data:image/png;base64,${btoa(String.fromCharCode.apply(null, res.Data))}`);
    });
  }, [FileID]);
  return (
    <img className="img" alt="" onLoad={onLoad} src={imgSrc} />
  );
};
