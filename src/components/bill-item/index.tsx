import React, { memo } from 'react';
import { MyIcon } from '../myIcon';
import { BillItemWrapper } from './style';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Ipropos {
  bill: {
    billId: number;
    billType: string;
    createAt: string;
    money: number;
    remark: string;
  };
}

const BillItem: React.FC<Ipropos> = props => {
  const { billId, billType, money, createAt, remark } = props.bill;
  const navigate = useNavigate();

  return (
    <BillItemWrapper
      money_color={billType === '支出' ? '#007fff' : '#ecbe25'}
      onClick={() => navigate(`/detail/${billId}`)}
    >
      <div className="top">
        <div className="type">
          <MyIcon size="sm" type={billType === '支出' ? 'icon-zhichu' : 'icon-shouru'} />
          <span>{remark}</span>
        </div>
        <span className="money">
          {billType === '收入' ? '+' : '-'}
          {money}
        </span>
      </div>
      <div className="time">{dayjs(+createAt).format('HH:mm')}</div>
    </BillItemWrapper>
  );
};

export default memo(BillItem);
