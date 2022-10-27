import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ireplies {
  id: number;
  avatar: string;
  content: string;
}
export interface Icomment {
  id: number;
  avatar: string;
  userName: string;
  content: string;
  date: string;
  likes: string[];
  replies: Ireplies[]
}

interface IcommentState {
  commentList: Icomment[];
  reReplyFlag: string[];
}
const initialState: IcommentState = {
  commentList: [],
  reReplyFlag: [],
};
const comment = createSlice({
  name: 'comment',
  initialState,

  reducers: {
    updateCommentList: (state, action: PayloadAction<Icomment[]>) => ({
      ...state,
      commentList: action.payload,
    }),

    updateReReplyFlag: (state, action: PayloadAction<string[]>) => ({
      ...state,
      reReplyFlag: action.payload,
    }),
  },
});

export const { updateCommentList, updateReReplyFlag } = comment.actions;

export default comment;
