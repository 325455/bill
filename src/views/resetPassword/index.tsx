import React, { memo, useState } from 'react';
import { ArrowLeft } from '@zarm-design/icons';
import { Button, Input, List, NavBar, Toast } from 'zarm';
import { ResetPasswordWrapper } from './style';
import taxios from '@/services';

const ResetPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const onSubmitClick = async () => {
    !oldPassword && Toast.show('请输入原密码');
    !newPassword && Toast.show('请输入新密码');
    !reNewPassword && Toast.show('请确认新密码');
    newPassword !== reNewPassword && Toast.show('两次输入的密码不一致');
    if (oldPassword && newPassword && reNewPassword && newPassword === reNewPassword) {
      const res = await taxios.post('/user/changePassword', { oldPassword, newPassword });
      console.log(res);
    }
  };

  return (
    <ResetPasswordWrapper>
      <NavBar left={<ArrowLeft theme="primary" onClick={() => window.history.back()} />} title="修改密码" />
      <List>
        <List.Item title="原密码">
          <Input
            placeholder="请输入原密码"
            value={oldPassword}
            onChange={(e: any) => setOldPassword(e.target.value)}
          />
        </List.Item>
        <List.Item title="新密码">
          <Input
            placeholder="请输入新密码"
            value={newPassword}
            onChange={(e: any) => setNewPassword(e.target.value)}
          />
        </List.Item>
        <List.Item title="新密码">
          <Input
            placeholder="请再次确认新密码"
            value={reNewPassword}
            onChange={(e: any) => setReNewPassword(e.target.value)}
          />
        </List.Item>
        <List.Item>
          <Button block theme="primary" onClick={onSubmitClick}>
            提交
          </Button>
        </List.Item>
      </List>
    </ResetPasswordWrapper>
  );
};

export default memo(ResetPassword);
