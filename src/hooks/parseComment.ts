import commentApi from 'apis/commentApi';
import { getCommentDate } from 'common/utils';
import { Icomment } from 'reducers/comment';

export default function parseComments() {
  const fetchComments = async (boardNum: number) => {
    const { data: res } = await commentApi.getComments(boardNum);
    // res.data = [{replyTime: '1시간'}, {replyTime: '2시간'}, {replyTime: '1분'}]
    // ['1시간', '2시간', '1분']
    const updatedTimeList = res.data.map((item: Icomment) => ({
      ...item,
      replyTime: getCommentDate(item.replyTime),
    }));
    updatedTimeList.sort((a: Icomment, b: Icomment) => {
      if (a.replyNum > b.replyNum) return 1;
      return -1;
    });
    return updatedTimeList;
  };

  return {
    fetchComments,
  };
}
