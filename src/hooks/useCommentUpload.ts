import axios from 'axios';
import { KeyboardEvent } from 'react';

import { getAccessToken, getCommentDate } from 'common/utils';
import { updateCommentList } from 'reducers/comment';
import { setLoading } from 'reducers/loading';
import { ISelectedPostData } from 'reducers/selectedPostData';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function useCommentUpload(selectedPostData: ISelectedPostData) {
  const dispatch = useAppDispatch();
  const { commentList } = useAppSelector((state) => state.comment);

  function addCommentProcess(e: KeyboardEvent<HTMLInputElement>) {
    const element = e.target as HTMLInputElement;
    if (getAccessToken() !== '') {
      if (sessionStorage.getItem('replyInfo') === null) {
        // 댓글 업로드
        if (process.env.REACT_APP_HOST !== undefined) {
          dispatch(setLoading(true));
          axios
            .post(
              `${process.env.REACT_APP_HOST}/api/comment/insert`,
              {
                boardNum: selectedPostData.boardNum,
                replyContext: element.value,
              },
              {
                headers: {
                  'X-ACCESS-TOKEN': getAccessToken(),
                },
              },
            )
            .then((res) => {
              console.log(res);
              dispatch(setLoading(false));
              element.value = '';
              res.data.commentTime = getCommentDate(res.data.commentTime);
              const tempList = [...commentList, res.data];
              tempList.sort((a, b) => {
                if (a.replyNum > b.replyNum) return 1;
                return -1;
              });
              dispatch(updateCommentList(tempList));
            })
            .catch((err) => console.log(err));
        }
      } else {
        // const [replyNum, replyUserName] = sessionStorage
        //   .getItem('replyInfo')
        //   .split(',');
      }
      // const replyContext = replyInput.current.value.replace(
      //   replyUserName,
      // '',
      // );
      // 대댓글 업로드
      // axios
      //   .post(
      //     `${process.env.REACT_APP_HOST}/api/replyReply/insert`,
      //     {
      //       replyNum,
      //       replyReplyContext: replyContext,
      //     },
      //     {
      //       headers: {
      //         'X-ACCESS-TOKEN': localStorage.getItem('accessToken'),
      //       },
      //     },
      //   )
      //   .then((res) => {
      //     axios
      //       .get(
      //         `${process.env.REACT_APP_HOST}/api/replyReply/getReply/${res.data.replyNum}`,
      //         {
      //           headers: {
      //             'X-ACCESS-TOKEN': localStorage.getItem('accessToken'),
      //           },
      //         },
      //       )
      //       .then((reReplyRes) => {
      //         const newcommentList = [...commentList];
      //         const idx = newcommentList.findIndex(
      //           (item) => item.replyNum === res.data.replyNum,
      //         );
      //         newcommentList[idx].reReply = reReplyRes.data;
      //         replyInput.current.value = '';
      //         sessionStorage.removeItem('replyInfo');
      //       })
      //       .catch((err) => console.log(err));
      //   })
      //   .catch((err) => console.log(err));
      // }
    } else {
      alert('로그인 후 이용해주세요.');
    }
  }
  return { addCommentProcess };
}
export default useCommentUpload;
