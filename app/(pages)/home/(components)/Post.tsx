"use client";

import { PostModel } from "@/models";
import dayjs from "dayjs";
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
      className="bg-gray-10 p-5 flex flex-col gap-4 max-h-[160px] max-w-[304px] w-full rounded-lg cursor-pointer overflow-hidden"
    >
      <div className="flex gap-6 justify-between">
        <div className="flex gap-4">
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
        className="text-xs truncate whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: item?.description }}
      ></div>
    </div>
  );
}
