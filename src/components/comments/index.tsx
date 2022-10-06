import { useEffect } from 'react';
import styled from 'styled-components';

import CommentCreate from './CommentCreate';
import CommentSection from './CommentSection';

import ModalSocial from 'components/postModal/ModalSocial';
import useComments from 'hooks/useComments';
import { updateReplyList } from 'reducers/comment';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import devices from 'styles/device';

function Comments({modalOpacity}) {
  const currentPostData = useAppSelector((state) => state.selectedPostData);
  const { fetchComments } = useComments();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const commentInterval:ReturnType<typeof setInterval> = setInterval(() => {
        fetchComments(currentPostData.boardNum)
          .then((updatedTimeList) => {
            dispatch(updateReplyList(updatedTimeList));
          }).catch((err) => err)
      // }, 1000);
    // return () => {
    //   clearInterval(commentInterval);
    // }
  }, [modalOpacity, currentPostData.boardNum]);
// 
  return (
    <Wrapper>
      {/* 좋아요 댓글 갯수 출력하는 코드 */}
      <ModalSocial />
      <hr />
      {/* 댓글 창 시작 */}
      <CommentSection />
      {/* 댓글 작성칸 */}
      <CommentCreate
        currentPostData={currentPostData}
      />
    </Wrapper>
  );
}

export default Comments;
const Wrapper = styled.div.attrs({className: 'comments-wrapper'})`
  @media ${devices.laptop} {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
`