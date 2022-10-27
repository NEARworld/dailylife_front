import styled from 'styled-components';

import AvatarIcon from 'components/Icons/AvatarIcon';
import LikeIcon from 'components/Icons/LikeIcon';
import { type Icomment } from 'reducers/comment';

interface Props {
  item: Icomment;
}

function CommentMain({ item }: Props) {
  return (
    <CommentMainWrapper>
      <ProfileBox>
        <AvatarIcon image="" />
        <Username>{item.userName}</Username>
        <CommentContent>{item.content}</CommentContent>
      </ProfileBox>
      <LikeIcon replyNum={item.id} />
    </CommentMainWrapper>
  );
}

export default CommentMain;
const CommentMainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .username {
    margin-left: 10px;
    font-weight: 600;
  }
  & > .comment-content {
    flex: 3;
    margin-left: 10px;
  }
  & > .comment-like > svg {
    width: 14.08px;
    height: 12.94px;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Username = styled.div``;
const CommentContent = styled.div``;
