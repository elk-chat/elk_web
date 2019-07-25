import React, { useState, useEffect } from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import getFileSrc, { getFileSrcFromCache } from '../utils/get-file-src';

interface ChatAvatarProps {
  AvatarFileID: Long | string;
  UserName?: string;
}

const ChatAvatar: React.SFC<ChatAvatarProps> = (props) => {
  const {
    AvatarFileID = '', UserName = '', text, ...other
  } = props;
  const strID = AvatarFileID.toString();
  const srcFromCacha = getFileSrcFromCache(strID);
  const [avatarSrc, setAvatarSrc] = useState(srcFromCacha);

  useEffect(() => {
    if (AvatarFileID && !srcFromCacha) {
      getFileSrc(AvatarFileID).then((src) => {
        setAvatarSrc(src);
      });
    }
    return () => {};
  }, [AvatarFileID]);

  return (
    <Avatar key={avatarSrc} src={avatarSrc || srcFromCacha} {...other} text={text || UserName[0]} />
  );
};

export default ChatAvatar;
