"use client";

import useSWR from "swr";
import CommentSection from "./(components)/CommentSection";
import PostAction from "./(components)/PostActions";
import PostContent from "./(components)/PostContent";
import { PostModel } from "@/models";
import queryString from "query-string";
import { usePathname } from "next/navigation";

export default function Page() {
  //path
  const id = usePathname().split("/").slice(-1)[0];

  //api
  const { data, error } = useSWR<PostModel[]>(
    `/api/posts?${queryString.stringify({
      id,
    })}`
  );

  const post = data?.[0];

  return (
    <div className="w-full p-10 border-l-2 border-gray-10 h-screen overflow-auto">
      <div className="flex flex-col gap-12 h-full justify-between">
        <div className="flex flex-col gap-12">
          <PostAction post={post} />

          <PostContent post={post} />
        </div>

        <CommentSection post={post} />
      </div>
    </div>
  );
}
