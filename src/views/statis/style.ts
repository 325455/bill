import styled from 'styled-components';

export const StatisWrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  .total {
    height: 170px;
    background-color: #fff;
    text-align: center;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .date {
      width: 110px;
      font-size: 14px;
      background-color: #f5f5f5;
      border-radius: 3px;
      padding: 3px 0;
      //分割线
      span::after {
        content: '';
        display: inline-block;
        height: 12px;
        width: 1px;
        margin: 0 5px;
        background-color: #484848;
      }
    }
    .total-expense,
    .total-expense-money {
      color: #007fff;
      font-size: 12px;
    }
    .total-expense-money {
      font-size: 22px;
      font-weight: 700;
    }
    .total-pay {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      font-weight: 600;
    }
  }
  .bill-statis {
    border-top: 1px solid #f5f5f5;
    padding: 10px;
    background-color: #fff;
  }
  #line-chart,
  #rose-chart {
    width: 90%;
    height: 200px;
    margin: 0 auto;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  #rose-chart {
    border-top: 1px solid #f5f5f5;
    margin-top: 23px;
  }
`;
