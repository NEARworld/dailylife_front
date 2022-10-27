import axios from 'axios';
import styled from 'styled-components';

import { getAccessToken } from 'common/utils';
import { updateCommentList } from 'reducers/comment';
import { useAppSelector, useAppDispatch } from 'store/hooks';

function DeleteCommentPopup(props) {
  const dispatch = useAppDispatch();
  const { commentList } = useAppSelector((state) => state.comment);
  const { setReplyDeleteFlag, replyDeleteFlag } = props;

  const handleDeleteComment = (replyNum: number) => {
    if (process.env.REACT_APP_HOST !== undefined) {
      axios
        .delete(`${process.env.REACT_APP_HOST}/api/reply/delete/${replyNum}`, {
          headers: {
            'X-ACCESS-TOKEN': getAccessToken(),
          },
        })
        .then(() => {
          const idx = commentList.findIndex(
            (item: { id: number }) => item.id === replyNum,
          );
          const newCommentList = [...commentList];
          newCommentList.splice(idx, 1);
          dispatch(updateCommentList(newCommentList));
          setReplyDeleteFlag(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Button
        type="button"
        onClick={() => {
          handleDeleteComment(replyDeleteFlag);
        }}
      >
        삭제
      </Button>
      <Button
        type="button"
        onClick={() => {
          setReplyDeleteFlag(false);
        }}
      >
        취소
      </Button>
    </Container>
  );
}

export default DeleteCommentPopup;

const Container = styled.div`
  position: absolute;
`;

const Button = styled.button``;
