import styled from "styled-components";

export const SignWrapper = styled.div`
  .sign {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
      217deg,
      #6fb9f8,
      #3daaf85e,
      #49d3fc1a,
      #3fd3ff00
    );

    .header {
      width: 100%;
      height: 200px;
      background: url("//s.yezgea02.com/1616032174786/cryptocurrency.png")
        no-repeat center/120%;
    }

    .tabs {
      padding: 10px;
      .content {
        margin-top: 33px;
        background-color: transparent;
      }
      .content *:not(button) {
        background-color: transparent;
      }
      //重写样式
      .za-tabs__header {
        width: 30%;
        --active-color: #597fe7;
        .za-tabs__tab {
          font-size: 14px;
          color: #597fe7;
        }
        .za-tabs__tab--active {
          font-size: 20px;
        }
      }
      .za-list-item__title {
        width: 40px;
      }
      button {
        margin-top: 20px;
      }
      .icon {
        position: relative;
        top: 4px;
        left: 4px;
      }
      .indetify {
        flex-shrink: 0;
        position: relative;
        left: 15px;
      }
    }
  }
`;
