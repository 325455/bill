import React, { memo, useEffect, useState } from 'react';
import { UserWrapper } from './style';
import { Button, List, Modal, Toast } from 'zarm';
import { useNavigate } from 'react-router-dom';
import taxios from '@/services';

interface IResponse {
  phone: number;
  username: null;
  avatar: string;
  signature: string;
  create_at: string;
}

const User: React.FC = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<IResponse>();
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = await taxios.get('/user/getUserInfo');
    setUserInfo(data.user);
  };

  const logoutBtnClick = () => {
    Modal.confirm({
      title: '退出',
      content: '确认退出登录',
      onConfirm() {
        localStorage.removeItem('token');
        navigate('/sign');
        Toast.show('退出成功');
      },
    });
  };

  return (
    <UserWrapper>
      <div className="header">
        <div className="info">
          <div className="username">昵称：{userInfo?.username || userInfo?.phone}</div>
          <div className="signature">
            <img src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
            <span>{userInfo?.signature}</span>
          </div>
        </div>
        <div className="avatar">
          <img src={userInfo?.avatar} alt="" />
        </div>
      </div>
      <div className="choice">
        <List>
          <List.Item
            hasArrow
            title={
              <>
                <div className="item">
                  <img
                    style={{ width: 20, verticalAlign: '-7px' }}
                    src="//s.yezgea02.com/1615974766264/gxqm.png"
                    alt=""
                  />
                  &nbsp;&nbsp;修改用户信息
                </div>
              </>
            }
            onClick={() => {
              navigate('/change-user-info');
            }}
          />
          <List.Item
            hasArrow
            title={
              <>
                <div className="item">
                  <img
                    style={{ width: 20, verticalAlign: '-7px' }}
                    src="//s.yezgea02.com/1615974766264/zhaq.png"
                    alt=""
                  />
                  &nbsp;&nbsp;修改密码
                </div>
              </>
            }
            onClick={() => {
              navigate('/reset-password');
            }}
          />
          <List.Item
            hasArrow
            title={
              <>
                <div className="item">
                  <img
                    style={{ width: 20, verticalAlign: '-7px' }}
                    src="//s.yezgea02.com/1615975178434/lianxi.png"
                    alt=""
                  />
                  &nbsp;&nbsp;关于我们
                </div>
              </>
            }
            onClick={() => {
              navigate('/about');
            }}
          />
        </List>
      </div>
      <div className="logout-btn">
        <Button className="logout" theme="danger" block onClick={logoutBtnClick}>
          退出登录
        </Button>
      </div>
    </UserWrapper>
  );
};

export default memo(User);
