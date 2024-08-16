import React, { memo, useEffect, useState } from 'react';
import { HomeWrapper } from './style';
import dayjs from 'dayjs';
import { ArrowDown } from '@zarm-design/icons';
import TypePopup from '@/components/type-popup';
import { DatePicker } from 'zarm';
import BillPopup from '@/components/bill-popup';
import pen from '@/assets/images/icons/pen.svg';
import shou from '@/assets/images/icons/shou.png';
import zhi from '@/assets/images/icons/zhi.png';
import { PullRefresh } from 'react-vant';
import { ArrowLeft, Arrow } from '@react-vant/icons';
import BillItem from '@/components/bill-item';
import taxios from '@/services';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

const Home: React.FC = () => {
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [selectedType, setSelectedType] = useState('全部类型');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthTotal, setMonthTotal] = useState({ expense: 0, income: 0 });
  const [todayTotal, setTodayTotal] = useState({ expense: 0, income: 0 });
  const [todayList, setTodayList] = useState<IBill[]>([]);
  const [day, setDay] = useState(dayjs().date());
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, [selectedType, selectedDate]);

  //服务器返回的一个月的数据
  const getList = async () => {
    const { data } = await taxios.get(`/bill/getBillList/${selectedType}/${+selectedDate}`);
    setMonthTotal(data.monthTotal);
    setList(data.list);
    countDayData(data.list, day);
  };

  //计算一天的数据
  const countDayData = (allList: IBill[], currentDay: number) => {
    const _todayList = allList
      .filter((bill: IBill) => dayjs(+bill.createAt).date() === currentDay)
      .sort((a: IBill, b: IBill) => +b.createAt - +a.createAt);

    const _todayTotal = { expense: 0, income: 0 };
    _todayList.forEach((bill: IBill) => {
      bill.billType === '收入' && (_todayTotal.income += bill.money);
      bill.billType === '支出' && (_todayTotal.expense += bill.money);
    });
    setTodayTotal(_todayTotal);
    setTodayList(_todayList);
    setDay(currentDay);
  };

  const datePopupConfirm = (date: any) => {
    setSelectedDate(date);
    setShowDatePopup(false);
  };

  const onRefresh = async () => {
    return getList();
  };

  return (
    <HomeWrapper>
      <div className="header">
        <div className="total">
          总支出：<span className="total_expense">￥{monthTotal.expense}</span>
          总收入：<span className="total_income">￥{monthTotal.income}</span>
        </div>
        <div className="choice">
          <div className="bill-type" onClick={() => setShowTypePopup(!showTypePopup)}>
            {selectedType}
            <ArrowDown size="sm" style={{ marginLeft: '4px' }} />
          </div>
          <div className="bill-date" onClick={() => setShowDatePopup(!showDatePopup)}>
            {dayjs(selectedDate).format('YYYY-MM')}
            <ArrowDown size="sm" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      </div>
      <div className="subtitle">
        <div className="day">
          <ArrowLeft fontSize={14} color="#007fff" onClick={() => countDayData(list, day - 1)} />
          <span>{`${dayjs(selectedDate).format('YYYY-MM')}-${day}`}</span>
          <Arrow fontSize={14} color="#007fff" onClick={() => countDayData(list, day + 1)} />
        </div>
        <div className="total">
          <img src={zhi} alt="" />
          <span>¥{todayTotal.expense}</span>
          <img src={shou} alt="" />
          <span>¥{todayTotal.income}</span>
        </div>
      </div>
      {/* 添加账单按钮 */}
      <div className="add" onClick={() => setShowAddBill(!showAddBill)}>
        <img src={pen} alt="" />
      </div>
      {/* 内容区域 */}
      <div className="main">
        <PullRefresh successText="刷新成功" onRefresh={() => onRefresh()}>
          <div className="bill-items">
            {todayList.map((item: IBill) => (
              <BillItem key={item.billId} bill={item} />
            ))}
            <span className="no-more">暂无更多数据~</span>
          </div>
        </PullRefresh>
      </div>
      {/* 选择类型弹出框 */}
      <TypePopup
        isShow={showTypePopup}
        setIsShow={setShowTypePopup}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {/* 选择日期弹出框 */}
      <DatePicker
        visible={showDatePopup}
        value={selectedDate}
        columnType={['year', 'month']}
        onCancel={() => setShowDatePopup(false)}
        onConfirm={datePopupConfirm}
      />
      {/* 添加账单弹出框 */}
      <BillPopup
        isShow={showAddBill}
        afterConfirm={getList}
        setIsShow={setShowAddBill}
        billOperateType="add"
      />
    </HomeWrapper>
  );
};

export default memo(Home);
