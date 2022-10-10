import styled from 'styled-components';

import postApi from 'apis/postApi';
import ModalCloseButton, { ModalClose } from 'components/buttons/ModalCloseButton';
import AvatarIcon from 'components/Icons/AvatarIcon';
import KebabMenu from 'components/Icons/KebabMenu';
import { updateModalStatus } from 'reducers/kebab.postModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import devices from 'styles/device';

function WriterInfo({ setModalOpacity }) {
  const dispatch = useAppDispatch();
  const kebabModal = useAppSelector((state) => state.kebabModal);
  const selectedPostData = useAppSelector((state) => state.selectedPostData);
  const toggleMenu = () => dispatch(updateModalStatus(!kebabModal.isOpen));

  return (
    <div className="writer-info-container">
      <WriterInfoWrapper>
        <AvatarIcon image="" />
        <Username>dailyLife1</Username>
        <Follow>팔로우</Follow>
      </WriterInfoWrapper>
      <CloseContainer>
        <KebabMenuContainer
          onClick={() => {
            toggleMenu();
          }}
        >
          <KebabMenu />
          <KebabListContainer>
            {kebabModal.isOpen ? (
              <KebabList onMouseLeave={toggleMenu}>
                <ModifyButton type="button">수정하기</ModifyButton>
                <DeleteButton
                  type="button"
                  className="kebab-list-delete-button"
                  onClick={() => {
                    postApi
                      .deleteBoardData(selectedPostData.boardNum)
                      .then((res) => console.log(res))
                      .catch((err) => console.log(err));
                    alert('게시글이 성공적으로 삭제되었습니다.');
                    toggleMenu();
                    setModalOpacity(0);
                  }}
                >
                  삭제하기
                </DeleteButton>
                <CancelButton
                  type="button"
                  className="kebab-list-cancel-button"
                  onClick={toggleMenu}
                >
                  취소
                </CancelButton>
              </KebabList>
            ) : null}
          </KebabListContainer>
        </KebabMenuContainer>
        <ModalCloseButton setModalOpacity={setModalOpacity} />
      </CloseContainer>
    </div>
  );
}

export default WriterInfo;

const CloseContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;

  @media ${devices.mobileS} {
    & > ${ModalClose} {
      position: absolute;
      display: none;
    }
  }

  @media ${devices.laptop} {
    & > ${ModalClose} {
      display: block;
      right: -3vh;
      top: -10vh;
    }
    & > ${ModalClose} > svg > path {
      stroke: #f4f4f4;

    }
  }
  @media ${devices.laptopL} {
    & > ${ModalClose} {
      right: -7vh;
    }
  }
`;

const KebabMenuContainer = styled.div`
  position: relative;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

const KebabListContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 0px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  z-index: 1;
`;

const WriterInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 10px;
  justify-content: space-around;
  align-items: center;
`;
const KebabList = styled.div`
  padding: 0;
  width: 214px;
  /* height: 9.9vh; */
  height: 165px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;

  & > button {
    width: 100%;
    top: 30px;
    height: 55px;
    line-height: 55px;
    background: #ffffff;
    border: 0.1px solid #dcdcdc;
  }
  & > button:hover {
    background-color: #f3f3f3;
  }
`;
const ModifyButton = styled.button`
  color: #6a6a6a;
`;
const DeleteButton = styled.button`
  color: #6a6a6a;
`;
const CancelButton = styled.button`
  color: #e50303;
`;
const Follow = styled.button`
  width: 68px;
  height: 28px;
  border: none;
  border-radius: 100px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  background-color: #f0f0f0;

  @media ${devices.mobileS} {
    font-size: small;
  }
  @media ${devices.mobileM} {
    font-size: inherit;
  }
`;
const Username = styled.div`
  @media ${devices.mobileS} {
    font-size: small;
  }
  @media ${devices.mobileM} {
    font-size: inherit;
  }
`;
