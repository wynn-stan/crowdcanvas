"use client";

import { useWindowWidth } from "@react-hook/window-size";
import styled from "styled-components";
import { useContext, useState } from "react";
import { convertStringToHTML } from "@/utils";
import dayjs from "dayjs";
import useSWR from "swr";
import { PostModel } from "@/models";
import { UserContext } from "@/Contexts/user";
import CollapsedSidebar from "@/app/components/Sidebar/CollapsedSidebar";

import Post from "./Post";
import { usePathname } from "next/navigation";

export default function PostList() {
  //hooks
  const width = useWindowWidth();
  const { user } = useContext(UserContext);
  const endRoute = usePathname().split("/").filter(Boolean).slice(-1)[0];

  //variables
  const isMobile = width <= 480;

  //api
  const { data: posts, error } = useSWR<PostModel[]>("/api/posts");

  return (
    <StyledContainer endRoute={endRoute} className="py-[50px]">
      <div>
        <div className="flex justify-between items-center px-12">
          {isMobile && (
            <>
              <CollapsedSidebar />
              <span className="posts-heading">Posts</span>
            </>
          )}

          {!isMobile && (
            <>
              <span className="posts-heading">Posts</span>
              <div className="flex gap-4 items-center">
                <span>{user?.first_name}</span>
                <div className="">
                  <img
                    alt="profile-img"
                    src={user?.profile_image_url || `${process.env["NEXT_PUBLIC_AVATAR_URL"]}`}
                    className="rounded-full"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center px-5 flex-wrap gap-11 py-20">
          {posts?.map((item, index) => (
            <Post key={index} item={item} />
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.main<{ endRoute?: string }>`
  flex-grow: 1;

  & .posts-heading {
    font-size: 36px;
    letter-spacing: 3%;
  }

  height: 100vh;
  overflow: auto;

  @media (max-width: 1024px) {
    display: ${({ endRoute }) => (endRoute === "home" ? "block" : "none")};
  }

  @media (min-width: 1025px) {
    min-width: ${({ endRoute }) => (endRoute === "home" ? "100%" : "418px")};
    max-width: ${({ endRoute }) => (endRoute === "home" ? "100%" : "418px")};
  }
`;
