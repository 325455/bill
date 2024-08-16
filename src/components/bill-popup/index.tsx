import React, { memo, useState } from 'react';
import { BillPopupWrappe } from './style';
import { Cell, DatetimePicker, Input, NumberKeyboard, Popup, Toast } from 'react-vant';
import { ArrowDown } from '@react-vant/icons';
import dayjs from 'dayjs';
import taxios from '@/services';
import { log } from 'echarts/types/src/util/log.js';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

interface Ipropos {
  isShow: boolean;
  setIsShow: any;
  afterConfirm: any;
  bill?: IBill;
  billOperateType: 'update' | 'add';
}

const BillPopup: React.FC<Ipropos> = prpos => {
  const { isShow, setIsShow, afterConfirm, bill = null, billOperateType } = prpos;
  const [money, setMoney] = useState(bill?.money.toString() || '');
  const [billType, setBillType] = useState(bill?.billType || '支出');
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [date, setDate] = useState(bill?.createAt ? new Date(+bill.createAt) : new Date());
  const [remark, setRemark] = useState(bill?.remark || '');

  const onInput = (key: any) => {
    setMoney(money + key);
  };

  const onDelete = () => {
    const _money = money.slice(0, -1);
    setMoney(_money);
  };

  const onDatePopupConfirm = (v: any) => {
    setDate(v);
    setShowDatePopup(false);
  };

  const onSubmitBill = async () => {
    if (!money) {
      return Toast.info('请输入金额');
    }
    if (!remark) {
      return Toast.info('请输入备注信息');
    }
    const params = {
      money,
      createAt: +date,
      billType,
      remark,
    };
    //添加账单
    if (billOperateType === 'add') {
      const { data } = await taxios.post('/bill/addBill', params);
      if (data.code === '0') {
        Toast.info('账单添加成功');
        setIsShow(false);
        //重置输入框
        setMoney('');
        setBillType('支出');
        setDate(new Date());
        setRemark('');
        //父组件传递的确认后的事件
        afterConfirm();
      }
    }
    //修改账单
    if (billOperateType === 'update') {
      const { data } = await taxios.patch(`/bill/updateBill/${bill?.billId}`, params);
      if (data.code === '0') {
        Toast.info('账单修改成功');
        setIsShow(false);
        //父组件传递的确认后的事件
        afterConfirm();
      }
    }
  };

  return (
    <Popup
      visible={isShow}
      position="bottom"
      style={{ height: '473px' }}
      closeable
      round
      onClose={() => setIsShow(false)}
    >
      <BillPopupWrappe>
        {/* 用户选择 */}
        <div className="selector">
          <div className="type">
            <span
              className={`expense ${billType === '支出' ? 'active' : ''}`}
              onClick={() => setBillType('支出')}
            >
              支出
            </span>
            <span
              className={`income ${billType === '收入' ? 'active' : ''}`}
              onClick={() => setBillType('收入')}
            >
              收入
            </span>
          </div>
          <span className="date" onClick={() => setShowDatePopup(true)}>
            {dayjs(date).format('YYYY-MM-DD')} <ArrowDown style={{ transform: 'translateY(2px)' }} />
          </span>
        </div>
        <div className="input">
          <Cell title="￥">
            <Input
              value={money}
              placeholder="请输入金额"
              clearable
              clearTrigger="always"
              onClear={() => setMoney('')}
            />
          </Cell>
        </div>
        <div className="remark">
          <Cell>
            <Input.TextArea
              style={{ padding: '4px', border: '1px solid #ececec' }}
              placeholder="请输入备注信息"
              maxLength={50}
              showWordLimit
              value={remark}
              onChange={v => setRemark(v)}
            />
          </Cell>
        </div>
        <NumberKeyboard
          visible={true}
          theme="custom"
          extraKey="."
          closeButtonText="完成"
          onInput={onInput}
          onDelete={onDelete}
          onClose={onSubmitBill}
        />
        {/* 选择支付时间 */}
        <div className="dateSelector" style={{ visibility: showDatePopup ? 'visible' : 'hidden' }}>
          <DatetimePicker
            popup={{
              round: true,
            }}
            title="账单时间"
            visible={showDatePopup}
            type="datetime"
            minDate={new Date(date.getFullYear() - 10, 1, 1)}
            maxDate={new Date(date.getFullYear() + 10, 1, 1)}
            value={date}
            onCancel={() => setShowDatePopup(false)}
            onConfirm={onDatePopupConfirm}
          />
        </div>
      </BillPopupWrappe>
    </Popup>
  );
};

export default memo(BillPopup);
