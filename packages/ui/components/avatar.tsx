import React, { useState, useEffect } from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { GetFileState } from '@little-chat/sdk';

interface ChatAvatarProps {
  AvatarFileID: Long | string;
  UserName?: string;
}

const getAvatarSrc = async (AvatarFileID) => {
  const remoteFileInfo = await GetFileState({
    FileID: AvatarFileID
  });
  const avatarSrc = remoteFileInfo.File.URL;
  return avatarSrc;
};

const AvatarCache = {};

const ChatAvatar: React.SFC<ChatAvatarProps> = (props) => {
  const { AvatarFileID = '', UserName = '', ...other } = props;
  const strID = AvatarFileID.toString();
  const [avatarSrc, setAvatarSrc] = useState(AvatarCache[strID]);

  useEffect(() => {
    if (AvatarFileID && !AvatarCache[strID]) {
      getAvatarSrc(AvatarFileID).then((src) => {
        setAvatarSrc(src);
        AvatarCache[strID] = src;
      });
    }
    return () => {};
  }, [AvatarFileID]);

  return (
    <Avatar src={avatarSrc} {...other}>
      {UserName[0] || ''}
    </Avatar>
  );
};

export { getAvatarSrc };

export default ChatAvatar;
