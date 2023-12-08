"use client";

import { PostModel } from "@/models";
import dayjs from "dayjs";
import Meta from "../Meta";
import Button from "../../Button/Button";
import { Ban } from "lucide-react";

export default function Content({ post }: { post?: PostModel }) {
  const isPastEvent =
    post &&
    post.event &&
    dayjs(new Date()).diff(post.event.end_date, "day") > 0;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col-reverse sm:flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-40">{post?.author?.first_name}</div>
          <div className="text-3xl">{post?.title}</div>

          {post?.post_type === "event" && (
            <Meta item={post} truncateAddress={false}>
              {isPastEvent && (
                <Button className="!bg-blue flextext-white items-center !py-1 !px-3 !rounded-md">
                  <Ban size={16} color="white" />
                  <span>Past event</span>
                </Button>
              )}{" "}
            </Meta>
          )}
        </div>

        <div className="flex justify-between gap-5">
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
