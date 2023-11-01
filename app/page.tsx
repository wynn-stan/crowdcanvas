"use client";

import { useWindowWidth } from "@react-hook/window-size";
import styled from "styled-components";
import { useContext } from "react";

import CollapsedSidebar from "./components/Sidebar/CollapsedSidebar";
import { UserContext } from "./Contexts/user";

export default function Home() {
  //hooks
  const width = useWindowWidth();
  const { user } = useContext(UserContext);

  //variables
  const isMobile = width <= 480;

  return (
    <StyledContainer className="py-[50px] px-12">
      <div>
        {isMobile && (
          <div className="flex justify-between items-center">
            <CollapsedSidebar />
            <span className="posts-heading">Posts</span>
          </div>
        )}

        {!isMobile && (
          <div className="flex justify-between items-center">
            <span className="posts-heading">Posts</span>
            <div className="flex gap-4 items-center">
              <span>{user?.full_name}</span>
              <div className="">
                <img
                  alt="profile-img"
                  src={`${process.env["NEXT_PUBLIC_AVATAR_URL"]}/?seed=${user?.full_name}`}
                  className="rounded-full"
                  loading="lazy"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  flex-grow: 1;

  & .posts-heading {
    font-size: 36px;
    letter-spacing: 3%;
  }
`;
