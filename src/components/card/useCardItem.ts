import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import likeApi from 'apis/likeApi';
import parseComments from 'hooks/parseComment';
import { updateReplyList } from 'reducers/comment';
import { selectedPostActions } from 'reducers/selectedPostData';
import { useAppSelector } from 'store/hooks';

function useCardItem({
  heartState,
  setModalOpacity,
  boardNum,
  src,
  title,
  content,
}) {
  const [like, setLike] = useState<boolean>(heartState);
  const dispatch = useDispatch();
  const { fetchComments } = parseComments();
  const currentPostData = useAppSelector((state) => state.selectedPostData);
  const openModal = () => {
    setModalOpacity(1);
  };
  const handleClick = () => {
    openModal();

    fetchComments(currentPostData.boardNum)
      .then((updatedTimeList) => {
        dispatch(updateReplyList(updatedTimeList));
      })
      .catch((err) => err);
    dispatch(
      selectedPostActions.updateData({
        boardNum,
        src,
        title,
        content,
      }),
    );
  };

  const clickHeartEvent = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setLike(!like);
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      likeApi
        .updateBoardHeart(boardNum, accessToken)
        .then((res) => res)
        .catch((err) => err);
    } else alert('회원가입 후 이용하실 수 있습니다.');
  };
  return { handleClick, clickHeartEvent, like };
}
export default useCardItem;
