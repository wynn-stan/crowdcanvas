"use client";

import useSWR from "swr";
import { PostModel } from "@/models";
import queryString from "query-string";
import { usePathname } from "next/navigation";
import Actions from "./Detail/Actions";
import Content from "./Detail/Content";
import CommentSection from "./Detail/CommentSection";

export default function Detail() {
  //path
  const id = usePathname().split("/").slice(-1)[0];

  //api
  const { data, error, mutate } = useSWR<PostModel[]>(
    `/api/posts?${queryString.stringify({
      id,
    })}`
  );

  const post = data?.[0];

  return (
    <div className="w-full p-10 border-l-2 border-gray-10 min-h-screen md:h-screen md:overflow-auto">
      <div className="flex flex-col gap-12 h-full justify-between">
        <div className="flex flex-col gap-12">
          <Actions post={post} />

          <Content post={post} />
        </div>

        <CommentSection post={post} mutate={mutate} />
      </div>
    </div>
  );
}
