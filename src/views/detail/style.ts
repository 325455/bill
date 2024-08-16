import styled from 'styled-components';

export const DetailWrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  .content {
    padding: 0 16px;
    background-color: #fff;
    .type {
      padding-top: 24px;
      text-align: center;
      > span {
        margin-left: 4px;
      }
    }
    .money {
      text-align: center;
      font-size: 24px;
      margin: 12px 0;
    }
    .time,
    .remark {
      width: 100%;
      display: flex;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      > span {
        width: 88px;
        font-size: 16px;
        color: #484848;
        font-weight: 400;
      }
    }
    .btns {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 10px;
      border-top: 1px solid #f5f5f5;
      > div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      & > :nth-of-type(1) {
        color: red;
      }
    }
  }
`;
