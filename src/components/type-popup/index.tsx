import React, { memo } from 'react';
import type { ReactNode } from 'react';
import { Button, NavBar, Popup } from 'zarm';
import { ContentWraer, TypePopupWrapper } from './style';
import { Close } from '@zarm-design/icons';

interface Ipropos {
  children?: ReactNode;
  isShow: boolean;
  setIsShow: any;
  selectedType: string;
  setSelectedType: any;
}

const TypePopup: React.FC<Ipropos> = props => {
  const { isShow, setIsShow, selectedType, setSelectedType } = props;
  const onBtnClick = (choice: string) => {
    setSelectedType(choice);
    setIsShow(false);
  };

  return (
    <TypePopupWrapper>
      <Popup visible={isShow} direction="bottom" mask={true} onMaskClick={() => setIsShow(false)}>
        <ContentWraer>
          <div className="content">
            <NavBar
              title="请选择类型"
              right={<Close style={{ color: '#333', fontSize: '15px' }} onClick={() => setIsShow(false)} />}
            />
            <div className="btns">
              <Button
                theme={selectedType === '全部类型' ? 'primary' : 'default'}
                onClick={() => onBtnClick('全部类型')}
              >
                全部类型
              </Button>
              <Button theme={selectedType === '收入' ? 'primary' : 'default'} onClick={() => onBtnClick('收入')}>
                收入
              </Button>
              <Button theme={selectedType === '支出' ? 'primary' : 'default'} onClick={() => onBtnClick('支出')}>
                支出
              </Button>
            </div>
          </div>
        </ContentWraer>
      </Popup>
    </TypePopupWrapper>
  );
};

export default memo(TypePopup);
