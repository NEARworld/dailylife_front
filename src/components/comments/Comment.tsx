import React from 'react';
import styled from 'styled-components';

import CommentDate from './CommentDate';
import CommentMain from './CommentMain';

import { type Icomment } from 'reducers/comment';

interface Props {
  replyHover: number;
  setReplyHover: React.Dispatch<React.SetStateAction<number>>;
  // reReplyFlag: boolean;
  // index: number;
  item: Icomment;
}

function Comment({
  replyHover,
  setReplyHover,
  // reReplyFlag,
  // index,
  item,
}: Props) {
  return (
    <CommentContainer
      onMouseOver={() => setReplyHover(item.id)}
      onMouseOut={() => setReplyHover(-1)}
    >
      <CommentMain item={item} />
      <CommentDate item={item} replyHover={replyHover} />
      {/* 대댓글 목록 */}
      {/* <ReplyList reReplyFlag={reReplyFlag} item={item} index={index} /> */}
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div`
  display: grid;
  & > .comment-date-container {
    display: flex;
  }
`;
