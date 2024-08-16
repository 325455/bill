import styled from 'styled-components';

export const BillPopupWrappe = styled.div`
  padding-top: 40px;
  //样式重写，￥宽度
  .rv-cell__title {
    width: 35px;
    flex: 0;
    transform: translateY(1px);
  }
  .selector {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 10px;
    span {
      padding: 4px 14px;
      border-radius: 15px;
      background: #f5f5f5;
      font-size: 14px;
      cursor: pointer;
      &.expense {
        margin-right: 8px;
      }
    }
    .expense.active {
      background-color: #eafbf6;
      border: 1px solid #007fff;
      color: #007fff;
    }
    .income.active {
      background-color: #fbf8f0;
      border: 1px solid rgb(236, 190, 37);
      color: rgb(236, 190, 37);
    }
  }
  .dateSelector {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
  .input {
    border-bottom: 1px solid #ececec;
    margin: 5px 0;
    & * {
      font-size: 20px;
    }
  }
  .remark {
    > span {
      margin-left: 20px;
      margin-top: 30px;
      color: #007fff;
      font-size: 14px;
    }
  }
  .rv-number-keyboard {
    padding-bottom: 0;
  }
`;
