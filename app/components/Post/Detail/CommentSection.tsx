"use client";

import { UserContext } from "@/Contexts/user";
import { CommentModel, PostModel } from "@/models";
import { usePathname } from "next/navigation";
import queryString from "query-string";
import { useContext } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { Dot } from "lucide-react";
import CommentItem from "./CommentSection/Item";
import CommentForm from "./CommentSection/Form";

export default function CommentSection({
  post,
  mutate: mutatePost,
}: {
  post?: PostModel;
  mutate: () => void;
}) {
  //path
  const id = usePathname().split("/").slice(-1)[0];

  //api
  const {
    data: comments,
    error,
    mutate,
  } = useSWR<CommentModel[]>(
    `/api/posts/comments?${queryString.stringify({
      post_id: id,
    })}`
  );

  //hooks
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="text-xl flex gap-2 items-center">
          <span>Comments</span>
          <StyledCommentCount>
            {post?._count?.comments || "0"}
          </StyledCommentCount>
        </div>
        <div className="flex flex-col gap-5">
          {comments?.map((comment, index) => (
            <CommentItem key={index} comment={comment} mutate={mutate} />
          ))}
        </div>
      </div>
      <StyledRule />
      <div className="flex flex-col gap-4">
        <div className="text-gray-50">What do you think?</div>
        <div className="flex gap-3 mb-5">
          {user && (
            <StyledName className="bg-gray-20">{user.first_name[0]}</StyledName>
          )}
          <CommentForm {...{ post_id: post?.id, mutate, mutatePost }} />
        </div>
      </div>
    </div>
  );
}

const StyledCommentCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #3e495b;
  border-radius: 50%;
  color: white;
  font-size: 12px;
`;

const StyledName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 58px;
  min-height: 58px;
  border-radius: 50%;
`;

const StyledRule = styled.hr`
  margin: 20px 0;

  width: 100%;
  height: 2px;
  background-color: var(--color-gray-20);
`;
