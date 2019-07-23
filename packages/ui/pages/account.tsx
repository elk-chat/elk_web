import React, { useState, useEffect } from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Loading } from 'ukelli-ui/core/loading';
import { UserInfo, FEContentType } from '@little-chat/core/types';
import { UpdateProfile, UploadFile, GetFileState } from '@little-chat/sdk';
import {
  ImageReader,
} from '../utils/image-reader';
import ChatAvatar, { getAvatarSrc } from '../components/avatar';

interface AccountProps {
  userInfo: UserInfo;
}

const AccountChangeAvatarID = 'accountChangeAvatar';

const uploadFile = async (uploadParams) => {
  const { fileInfo, buffer } = uploadParams;
  const uint8 = new Uint8Array(buffer);
  let AvatarFileID;
  try {
    const { File } = await UploadFile({
      ContentType: FEContentType.Image,
      FileName: fileInfo.name,
      Width: fileInfo.width,
      Height: fileInfo.height,
      Data: uint8,
    });

    await UpdateProfile({
      AvatarFileID: File.FileID
    });

    AvatarFileID = File.FileID;
  } catch (e) {
    console.log(e);
  }

  return AvatarFileID;
};
const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => new Promise((resolve, reject) => {
  if (event.target && event.target.files && event.target.files.length !== 0) {
    const { files } = event.target;
    ImageReader(files[0]).then((res) => {
      uploadFile(res)
        .then(resolve)
        .catch(reject);
    });
  }
});

const Account: React.SFC<AccountProps> = (props) => {
  const { userInfo, logout } = props;
  const { AvatarFileID } = userInfo;
  const { UserName } = userInfo;

  const [updating, setUpdateState] = useState(false);
  const [nextAvatarID, setAvatarSrc] = useState(AvatarFileID);


  return (
    <div className="account-page">
      <Loading loading={updating} inrow />
      <div className="contact-info user-info-c">
        <div onClick={() => {
          document.querySelector(`#${AccountChangeAvatarID}`).click();
        }}>
          <ChatAvatar AvatarFileID={nextAvatarID} UserName={UserName} />
        </div>
        <div className="c">
          <span className="name">{UserName}</span>
        </div>
      </div>
      <div className="action-group">
        <span className="flex"></span>
        <div className="action-item last" onClick={e => logout()}>
          注销
        </div>
      </div>
      <input
        type="file"
        style={{
          display: 'none'
        }}
        id={AccountChangeAvatarID}
        onChange={(e) => {
          setUpdateState(true);
          changeAvatar(e).then((nextAvatarID) => {
            setUpdateState(false);
            setAvatarSrc(nextAvatarID);
          });
        }} />
    </div>
  );
};
export default Account;
