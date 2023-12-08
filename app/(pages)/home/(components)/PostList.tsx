"use client";

import useSWR from "swr";
import { PostModel } from "@/models";

import Post from "./Post";
import { Container } from "@/app/components";
import Skeleton from "react-loading-skeleton";

export default function PostList() {
  //api
  const { data: posts, error } = useSWR<PostModel[]>("/api/posts");

  return (
    <Container heading="Posts">
      <div className="flex flex-col gap-11">
        {/* Loading state */}
        {!posts &&
          !error &&
          Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} width="100%" height={110} />
          ))}

        {posts?.map((item, index) => (
          <Post key={index} item={item} />
        ))}
      </div>
    </Container>
  );
}
