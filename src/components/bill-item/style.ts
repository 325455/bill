import styled from 'styled-components';

export const BillItemWrapper = styled.div<{ money_color: string }>`
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  padding: 0 20px;
  align-items: center;
  padding-top: 15px;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    span {
      margin-left: 4px;
    }
    .money {
      color: ${props => props.money_color};
    }
  }
  .time {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
