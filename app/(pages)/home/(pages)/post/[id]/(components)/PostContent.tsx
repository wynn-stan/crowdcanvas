"use client";

import { PostModel } from "@/models";
import dayjs from "dayjs";

export default function PostContent({ post }: { post?: PostModel }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-40">{post?.author?.first_name}</div>
          <div className="text-3xl">{post?.title}</div>
        </div>
        <div className="flex gap-5">
          <div className="text-sm text-gray-30">
            {dayjs(post?.updatedAt).format("MMM DD YYYY, h:mm A ")}
          </div>
          <div>
            <img
              alt="img"
              src={post?.author?.profile_image_url}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <div
        className="text-gray-40 flex flex-col gap-4"
        dangerouslySetInnerHTML={{ __html: post?.description || "" }}
      ></div>
    </div>
  );
}
