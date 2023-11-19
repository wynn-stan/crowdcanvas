import axios from "axios";
import queryString from "query-string";

export const addCommentService = (payload: {
  content: string;
  created_by: string;
  created_for: string;
}) => axios.post("/api/posts/comments", payload);

export const deleteCommentService = (comment_id: string) =>
  axios.delete(
    `/api/posts/comments?${queryString.stringify({
      comment_id,
    })}`
  );

export const updatePostService = (
  post_id: string,
  payload: {
    title: string;
    description: string;
  }
) => axios.put(`/api/posts/${post_id}`, payload);

export const addPostService = (payload: { title: string; description: string; post_by: string }) =>
  axios.post(`/api/posts/`, payload);

export const deletePostService = (post_id: string) => axios.delete(`/api/posts/${post_id}`);
