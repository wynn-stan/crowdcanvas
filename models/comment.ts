import { PostModel, UserModel } from ".";

export interface CommentModel {
  id: string;
  author?: UserModel;
  reference?: PostModel;
  created_by: string;
  created_for: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
