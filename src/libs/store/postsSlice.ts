import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPostItem {
  id: number;
  title: string;
  short_description: string;
  cover_photo: string;
  created_at: string;
  slug: string;
  priority: number;
  user: {
    username: string;
    avatar: string;
  };
}

interface IPostState {
  posts: IPostItem[];
  top_post: IPostItem;
  other_top_posts: IPostItem[];
}

const initialState: IPostState = {
  posts: [],
  top_post: {} as IPostItem,
  other_top_posts: []
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsList(state, action: PayloadAction<IPostItem[]>) {
      state.posts = action.payload
      const priority_posts = action.payload.filter(item => item.priority === 1)
      state.top_post = priority_posts[Math.floor(Math.random() * priority_posts.length)];
      state.other_top_posts = priority_posts.splice(0, 3);
    }
  }
})

export const {
  getPostsList,
} = postsSlice.actions;

export default postsSlice.reducer;
