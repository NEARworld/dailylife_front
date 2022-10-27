import styled from 'styled-components';

import LikeIcon from '../Icons/LikeIcon';

import CommentIcon from 'components/Icons/CommentIcon';
import { useAppSelector } from 'store/hooks';

function ModalSocial() {
  const commentList = useAppSelector((state) => state.comment.commentList);
  return (
    <ModalSocialWrapper>
      <SocialIconsContainer>
        <LikeIcon />
        <CommentIcon />
      </SocialIconsContainer>
      <SocialCountContainer>
        <LikeCount>좋아요 {10}개</LikeCount>
        <CommentCount>댓글 {commentList.length}개</CommentCount>
      </SocialCountContainer>
    </ModalSocialWrapper>
  );
}

export default ModalSocial;

const ModalSocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SocialIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SocialCountContainer = styled.div``;
const LikeCount = styled.span``;
const CommentCount = styled.span`
  margin-left: 10px;
`;
