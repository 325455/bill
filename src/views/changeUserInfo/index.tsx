import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, Input, NavBar } from 'zarm';
import { ArrowLeft } from '@zarm-design/icons';
import { ChangeUserInfoWrapper } from './style';
import avaterCover from '@/assets/images/icons/头像蒙版.svg';
import taxios from '@/services';

const ChangeUserInfo: React.FC = () => {
  const [username, setUsername] = useState('');
  const [signature, setSignature] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = await taxios.get('/user/getUserInfo');
    setUsername(data.user.username);
    setSignature(data.user.signature);
    setTempAvatar(data.user.avatar);
  };

  const afterSelectImg = () => {
    if (fileInputRef.current?.files) {
      const files = fileInputRef.current?.files;
      if (!files[0].type.startsWith('image')) {
        alert('请上传图片类型文件');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        const res = e.target?.result as string;
        setTempAvatar(res);
      };
    }
  };

  const handleSaveClick = async () => {
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('signature', signature);
    if (fileInputRef.current?.files) {
      formdata.append('avatar', fileInputRef.current.files[0]);
    }
    await taxios.post('/user/changeUserInfo', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <ChangeUserInfoWrapper>
      <NavBar left={<ArrowLeft theme="primary" onClick={() => window.history.back()} />} title="用户信息" />
      <div className="content">
        <div className="avatar">
          <div className="upload">
            <input type="file" className="fileInput" ref={fileInputRef} onChange={afterSelectImg} />
            <img className="tempAvatar" src={tempAvatar} alt="" />
            <div className="mask">
              <img src={avaterCover} alt="" />
            </div>
          </div>
        </div>
        <div className="username">
          <div>用户名</div>
          <Input
            placeholder="请输入用户名"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
        <div className="signature">
          <div>个性签名</div>
          <Input
            placeholder="请输入个性签名"
            value={signature}
            onChange={(e: any) => setSignature(e.target.value)}
          />
        </div>
        <Button style={{ width: '100%', marginTop: '20px' }} theme="primary" onClick={handleSaveClick}>
          保存
        </Button>
      </div>
    </ChangeUserInfoWrapper>
  );
};

export default memo(ChangeUserInfo);
