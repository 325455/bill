import styled from 'styled-components';

export const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  .header {
    width: 100%;
    height: 80px;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #007fff;
    color: #fff;
    .total {
      font-size: 13px;
      font-weight: 700;
      span {
        font-size: 15px;
        margin-right: 10px;
      }
    }
    .choice {
      display: flex;
      justify-content: flex-end;
      margin-top: 17px;
      font-size: 13px;
      & > .bill-type {
        margin-right: 10px;
      }
      & > * {
        padding: 4px 9px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }
    }
  }
  .subtitle {
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px 15px;
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .day {
      > span {
        font-size: 16px;
        font-weight: 700;
        margin: 0 15px;
      }
      display: flex;
      align-items: center;
    }
    .total {
      img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        vertical-align: bottom;
      }
      > span {
        font-size: 13px;
        &:nth-of-type(1) {
          margin-right: 10px;
        }
      }
    }
  }
  .add {
    position: fixed;
    z-index: 100;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e9e9e9;
  }
  .main {
    .bill-items {
      height: 495px;
      margin-top: 118px;
      margin-bottom: 53px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .no-more {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
