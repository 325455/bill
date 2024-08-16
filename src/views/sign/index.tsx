import React, { memo, useEffect, useState } from 'react';
import { SignWrapper } from './style';
import { Button, Input, List, Tabs, Toast } from 'zarm';
import Vcode from 'react-vcode';
const { Panel } = Tabs;

import phoneIcon from '@/assets/images/icons/手机号.png';
import passwordIcon from '@/assets/images/icons/密码.png';
import identifyIcon from '@/assets/images/icons/验证码.png';
import taxios from '@/services';
import { useNavigate } from 'react-router-dom';

const Sign: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [signInPhone, setsignInPhone] = useState('');
  const [signInpassword, setsignInpassword] = useState('');
  const [signUpPhone, setsignUpPhone] = useState('');
  const [signUpPassword, setsignUppassword] = useState('');
  const [identyCode, setIdentyCode] = useState('');
  const [imgCode, setImgcode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  const signInBtnClick = async () => {
    if (!signInPhone) {
      return Toast.show('请输入用户名');
    }
    if (!signInpassword) {
      return Toast.show('请输入密码');
    }
    const { data } = await taxios.post('/user/signIn', {
      phone: signInPhone,
      password: signInpassword,
    });
    if (data.code === '0') {
      localStorage.setItem('token', data.token);
      Toast.show({
        icon: 'success',
        content: '登录成功',
      });
      setTimeout(() => {
        navigate('/home');
      }, 600);
    }
  };

  const SignUpBtnClick = async () => {
    if (!signUpPhone) {
      return Toast.show('请输入用户名');
    }
    if (!signUpPassword) {
      return Toast.show('请输入密码');
    }
    if (identyCode !== imgCode) {
      return Toast.show('验证码错误');
    }
    const { data } = await taxios.post('/user/signUp', {
      phone: signUpPhone,
      password: signUpPassword,
    });

    if (data.code === '0') {
      Toast.show({ content: '注册成功', icon: 'success' });
      //重置输入框
      setsignUpPhone('');
      setsignUppassword('');
      setIdentyCode('');
    }
  };

  return (
    <SignWrapper>
      <div className="sign">
        <div className="header"></div>
        <div className="tabs">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Panel title={'登录'}>
              <div className="content">
                <List>
                  <List.Item title={<img className="icon" src={phoneIcon}></img>}>
                    <Input
                      placeholder="请输入账号"
                      value={signInPhone}
                      onChange={(e: any) => {
                        setsignInPhone(e.target.value);
                      }}
                    />
                  </List.Item>
                  <List.Item title={<img className="icon" src={passwordIcon}></img>}>
                    <Input
                      placeholder="请输入密码"
                      type="password"
                      value={signInpassword}
                      onChange={(e: any) => {
                        setsignInpassword(e.target.value);
                      }}
                    />
                  </List.Item>
                  <List.Item>
                    <Button block theme="primary" onClick={signInBtnClick}>
                      登录
                    </Button>
                  </List.Item>
                </List>
              </div>
            </Panel>
            <Panel title={'注册'}>
              <div className="content">
                <List>
                  <List.Item title={<img className="icon" src={phoneIcon}></img>}>
                    <Input
                      placeholder="请输入账号"
                      value={signUpPhone}
                      onChange={(e: any) => setsignUpPhone(e.target.value)}
                    />
                  </List.Item>
                  <List.Item title={<img className="icon" src={passwordIcon}></img>}>
                    <Input
                      placeholder="请输入密码"
                      value={signUpPassword}
                      type="password"
                      onChange={(e: any) => setsignUppassword(e.target.value)}
                    />
                  </List.Item>
                  <List.Item title={<img className="icon" src={identifyIcon}></img>}>
                    <Input
                      placeholder="验证码"
                      value={identyCode}
                      onChange={(e: any) => {
                        setIdentyCode(e.target.value);
                      }}
                    />
                    <div className="indetify">
                      <Vcode length={4} height={30} onChange={(code: any) => setImgcode(code)} />
                    </div>
                  </List.Item>
                  <List.Item>
                    <Button block theme="primary" onClick={SignUpBtnClick}>
                      注册
                    </Button>
                  </List.Item>
                </List>
              </div>
            </Panel>
          </Tabs>
        </div>
      </div>
    </SignWrapper>
  );
};

export default memo(Sign);
