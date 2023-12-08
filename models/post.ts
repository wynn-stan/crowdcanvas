import { UserModel } from "./index";

export interface PostModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  post_by: string;
  title: string;
  description: string;
  author?: UserModel;
  _count: {
    comments: number;
  };
  post_type: "event" | "post";
  event?: EventModel;
}

export interface EventModel extends PostModel {
  address: string;
  end_date: string;
  event_type: string;
  id: string;
  related_post: string;
  start_date: string;
}
