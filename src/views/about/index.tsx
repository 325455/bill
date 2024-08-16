import React, { memo } from 'react';
import type { ReactNode } from 'react';
import { Button } from 'zarm';
import { AboutWrapper } from './style';

interface Ipropos {
  children?: ReactNode;
}

const About: React.FC<Ipropos> = () => {
  return (
    <AboutWrapper>
      <div className="about">
        <div className="title">好好学习，天天向上</div>
        <Button className="btn" block theme="primary" onClick={() => history.back()}>
          返回
        </Button>
      </div>
    </AboutWrapper>
  );
};

export default memo(About);
