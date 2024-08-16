import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailWrapper } from './style';
import { Dialog, NavBar, Toast } from 'react-vant';
import { MyIcon } from '@/components/myIcon';
import dayjs from 'dayjs';
import BillPopup from '@/components/bill-popup';
import taxios from '@/services';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

const Detail: React.FC = () => {
  let { billId } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState<IBill>();
  const [isShowBillPopup, setIsShowBillPopup] = useState(false);
  const [isShowDeleteTipBox, setIsShowDeleteTipBox] = useState(false);

  useEffect(() => {
    getBill();
  }, []);

  const getBill = async () => {
    const { data } = await taxios.get(`/bill/getBill/${billId}`);
    if (data.code === '0') {
      setBill(data.bill);
    }
  };

  const deleteBill = async () => {
    const { data } = await taxios.delete(`/bill/${billId}`);
    if (data.code === '0') {
      Toast.info('删除账单成功');
      setTimeout(() => {
        navigate('/home');
      }, 800);
    }
  };

  return (
    <DetailWrapper>
      <NavBar title="账单详情" leftText="返回" onClickLeft={() => window.history.back()} />
      {bill && (
        <>
          <div className="content">
            <div className="type">
              <MyIcon type={bill.billType === '收入' ? 'icon-shouru' : 'icon-zhichu'} />
              <span>{bill.billType}</span>
            </div>
            <div className="money">
              {bill.billType === '收入' ? '+' : '-'}
              {bill.money}
            </div>
            <div className="time">
              <span>记录时间</span> {dayjs(+bill.createAt).format('YYYY-MM-DD HH:mm')}
            </div>
            <div className="remark">
              <span>备注</span> {bill.remark}
            </div>
            <div className="btns">
              <div onClick={() => setIsShowDeleteTipBox(true)}>
                <MyIcon style={{ fontSize: '24px', marginRight: '3px' }} type="icon-shanchu" />
                删除
              </div>
              <div onClick={() => setIsShowBillPopup(true)}>
                <MyIcon style={{ fontSize: '30px' }} type="icon-bianji" />
                编辑
              </div>
            </div>
          </div>
          <BillPopup
            isShow={isShowBillPopup}
            setIsShow={setIsShowBillPopup}
            bill={bill}
            billOperateType="update"
            afterConfirm={getBill}
          />
          <Dialog
            visible={isShowDeleteTipBox}
            title="确认删除账单？"
            showCancelButton
            onConfirm={() => {
              deleteBill();
              setIsShowBillPopup(false);
            }}
            onCancel={() => {
              setIsShowDeleteTipBox(false);
            }}
          ></Dialog>
        </>
      )}
    </DetailWrapper>
  );
};

export default memo(Detail);
