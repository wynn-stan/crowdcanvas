"use client";

import Button from "@/app/components/Button/Button";
import Meta from "@/app/components/Post/Meta";
import { EventModel, PostModel } from "@/models";
import routes from "@/routes";
import dayjs from "dayjs";
import {
  Ban,
  BellRing,
  CalendarDays,
  Clock3,
  Dot,
  Globe,
  MapPin,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props {
  item: PostModel;
}

export default function Post({ item }: Props) {
  //navigation
  const router = useRouter();

  //variables
  const comment_count = item._count.comments;

  const diff = dayjs(new Date()).diff(item.createdAt, "hour");
  const isHot = diff < 5;

  const hasMeta = comment_count > 0 || item.post_type === "event";

  const isPastEvent =
    item.event && dayjs(new Date()).diff(item.event.end_date, "day") > 0;

  return (
    <StyledContainer
      onClick={() =>
        router.push(routes.home.posts.detail.replace("[id]", item.id))
      }
    >
      {isHot && (
        <StyledHot className="flex items-center justify-center bg-red">
          <BellRing size={16} color="white" />
        </StyledHot>
      )}
      <div className=" flex flex-col gap-4 py-5 px-7">
        <div className="flex gap-4 items-start">
          <div className="min-w-[40px]">
            <StyledImage
              alt="profile-img"
              src={
                item.author?.profile_image_url ||
                `${process.env["NEXT_PUBLIC_AVATAR_URL"]}`
              }
              className="rounded-full"
              loading="lazy"
              width={40}
              height={40}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div
              style={{ lineHeight: "26px" }}
              className="font-medium text-lg line-clamp-2"
            >
              {item.title}
            </div>
            <div className="flex items-center text-gray-30 font-medium text-xs">
              <span>{item.author?.first_name}</span>
              <Dot />
              <span>{dayjs(item?.updatedAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <div
          className="line-clamp-2 text-sm text-gray-30"
          dangerouslySetInnerHTML={{ __html: item?.description }}
        />
      </div>

      {hasMeta && (
        <div className="border-t py-5 px-7 flex flex-wrap gap-3 text-xs">
          <Meta item={item} />

          {comment_count > 0 ? (
            <Meta.Item Icon={MessageCircle}>
              {`${
                comment_count > 1 ? `${comment_count} comments` : "1 comment"
              }`}
            </Meta.Item>
          ) : (
            <></>
          )}

          {isPastEvent && (
            <Button className="!bg-blue flex items-center !py-1 !px-3 !rounded-md">
              <Ban size={16} color="white" />
              <span>Past event</span>
            </Button>
          )}
        </div>
      )}
    </StyledContainer>
  );
}

const StyledHot = styled.div`
  position: absolute;
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const StyledContainer = styled.div`
  position: relative;

  border-radius: 8px;
  border: 1px solid #e9e9e9;

  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  max-width: 667px;
  width: 100%;
`;

const StyledImage = styled.img``;
