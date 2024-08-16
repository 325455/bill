import styled from 'styled-components';

export const UserWrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  .header {
    width: 100%;
    height: 160px;
    background: url(http://s.yezgea02.com/1615971681107/%E4%BD%8D%E5%9B%BE%402x.png) no-repeat;
    background-size: cover;
    color: #fff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    .info {
      .username {
        background-color: rgba(89, 127, 231, 1);
        border-radius: 20px;
        padding: 4px 11px;
        font-weight: 700;
      }
      .signature {
        display: flex;
        align-items: center;
        margin-top: 8px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .avatar > img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
  }
  .choice {
    width: 90%;
    margin: 0 auto;
    padding: 0 10px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    transform: translateY(-48px);
    .item {
      font-size: 15px;
      display: flex;
      align-items: center;
    }
  }
  .logout-btn {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 80px;
  }
`;
