import React, { useState, useEffect } from 'react';
import { Loading } from '@deer-ui/core/loading';
import { UserInfo, FEContentType } from '@little-chat/core/types';
import { UpdateProfile, UploadFile } from '@little-chat/sdk';
import { VersionDisplayer } from 'version-helper';
import {
  ImageReader,
} from '../utils/image-reader';
import ChatAvatar from '../components/avatar';
// import VersionComponent from '../components/version-com';
import Link from '../components/nav-link';

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
const changeAvatar = (
  event: React.ChangeEvent<HTMLInputElement>
) => new Promise((resolve, reject) => {
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
  const { userInfo, logout, versionInfo } = props;
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
        }}
        >
          <ChatAvatar AvatarFileID={nextAvatarID} UserName={UserName} />
        </div>
        <div className="c">
          <span className="name">{UserName}</span>
        </div>
      </div>
      <div className="action-group">
        <div className="action-item b mb10">
          <Link Com="ChangePW" Title="修改密码">修改密码</Link>
        </div>
        <span className="flex"></span>
        <div className="action-item b mb10">
          {/* <VersionComponent versionInfo={versionInfo} /> */}
          <VersionDisplayer versionInfo={versionInfo} />
        </div>
        <div className="action-item last mb20" onClick={(e) => logout()}>
          登出
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
        }}
      />
    </div>
  );
};
export default Account;
