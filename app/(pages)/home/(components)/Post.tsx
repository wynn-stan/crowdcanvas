"use client";

import { PostModel } from "@/models";
import dayjs from "dayjs";
import { MessagesSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  item: PostModel;
}

export default function Post({ item }: Props) {
  //navigation
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/home/post/${item.id}`)}
      className="bg-gray-10 p-5 flex flex-col gap-4 max-w-[304px] w-full rounded-lg cursor-pointer overflow-hidden"
    >
      <div className="flex gap-6 justify-between">
        <div className="flex gap-4 overflow-hidden">
          <img
            src={item?.author?.profile_image_url || ""}
            alt="img"
            width={41}
            height={41}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1 overflow-hidden">
            <span className="truncate text-xs">{item?.title}</span>
            <span className="truncate text-gray-30 text-sm">{item?.author?.first_name}</span>
          </div>
        </div>
        <div className="text-gray-30 text-[10px]">{dayjs(item?.updatedAt).fromNow()}</div>
      </div>
      <div
        className="text-xs truncate whitespace-pre-wrap max-h-[54px] h-full"
        dangerouslySetInnerHTML={{ __html: item?.description }}
      ></div>

      <div className="w-full flex justify-end">
        <span className="flex gap-1 text-xs text-gray-30">
          <MessagesSquare size={16} className="" /> <span>{item._count.comments}</span>
        </span>
      </div>
    </div>
  );
}
