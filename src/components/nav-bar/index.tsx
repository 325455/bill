import React, { memo, useState } from 'react';
import { TabBar } from 'zarm';
import { NavWrapper } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyIcon } from '../myIcon';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState<string | number>(pathname);

  return (
    <NavWrapper>
      <TabBar
        activeKey={activeKey}
        onChange={(key: any) => {
          setActiveKey(key);
          navigate(key);
        }}
      >
        <TabBar.Item itemKey="/home" title="账单" icon={<MyIcon type="icon-zhangdan" />} />
        <TabBar.Item itemKey="/statis" title="统计" icon={<MyIcon type="icon-tongji" />} />
        <TabBar.Item itemKey="/user" title="我的" icon={<MyIcon type="icon-yonghu" />} />
      </TabBar>
    </NavWrapper>
  );
};

export default memo(Navbar);
