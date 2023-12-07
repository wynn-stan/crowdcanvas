"use client";

import useSWR from "swr";
import { PostModel } from "@/models";

import Post from "./Post";
import { Container } from "@/app/components";

export default function PostList() {
  //api
  const { data: posts, error } = useSWR<PostModel[]>("/api/posts");

  return (
    <Container heading="Posts">
      <div className="flex flex-wrap gap-11">
        {posts?.map((item, index) => (
          <Post key={index} item={item} />
        ))}
      </div>
    </Container>
  );
}
