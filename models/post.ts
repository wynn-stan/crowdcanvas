import { UserModel } from "./index";

export interface PostModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  post_by: string;
  title: string;
  description: string;
  author?: UserModel;
}
