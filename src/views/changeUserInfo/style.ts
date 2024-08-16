import styled from 'styled-components';

export const ChangeUserInfoWrapper = styled.div`
  .content {
    padding: 0 15px;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #ececec;
      padding: 20px 0;
      .upload {
        width: 100px;
        height: 100px;
        display: flex;
        border-radius: 15px;
        overflow: hidden;
        position: relative;
        > * {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .fileInput {
          overflow: hidden;
          z-index: 10;
          opacity: 0;
        }
        .tempAvatar {
          z-index: 8;
        }
        .mask {
          z-index: 9;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          img {
            width: 80%;
            height: 80%;
            opacity: 0.6;
          }
        }
      }
    }
    .username,
    .signature {
      padding-top: 15px;
      border-bottom: 1px solid #ececec;
      > div {
        color: #000;
        margin-bottom: 5px;
      }
      input {
        font-size: 14px;
      }
    }
  }
`;
