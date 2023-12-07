"use client";

import { useWindowWidth } from "@react-hook/window-size";
import styled from "styled-components";
import { useContext, useState } from "react";

import { PostModel } from "@/models";
import { UserContext } from "@/Contexts/user";
import CollapsedSidebar from "@/app/components/Sidebar/CollapsedSidebar";

import { usePathname } from "next/navigation";

export default function Container({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: String;
}) {
  //hooks
  const width = useWindowWidth();
  const { user } = useContext(UserContext);
  const endRoute = usePathname().split("/").filter(Boolean).slice(-1)[0];

  //variables
  const isMobile = width <= 480;

  return (
    <StyledContainer endRoute={endRoute} className="py-[50px] px-12">
      <div className="flex flex-col gap-14">
        <div className="flex justify-between items-center">
          {isMobile && (
            <>
              <CollapsedSidebar />
              <span className="heading">{heading}</span>
            </>
          )}

          {!isMobile && (
            <>
              <span className="heading">{heading}</span>
              <div className="flex gap-4 items-center">
                <span>{user?.first_name}</span>
                <div className="">
                  <img
                    alt="profile-img"
                    src={
                      user?.profile_image_url ||
                      `${process.env["NEXT_PUBLIC_AVATAR_URL"]}`
                    }
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

        <div>{children}</div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.main<{ endRoute?: string }>`
  flex-grow: 1;

  & .heading {
    font-size: 36px;
    letter-spacing: 3%;
  }

  height: 100vh;
  overflow: auto;

  @media (max-width: 1024px) {
    display: ${({ endRoute }) =>
      ["home", "events"].includes(endRoute || "") ? "block" : "none"};
  }

  @media (min-width: 1025px) {
    min-width: ${({ endRoute }) =>
      ["home", "events"].includes(endRoute || "") ? "100%" : "418px"};
    max-width: ${({ endRoute }) =>
      ["home", "events"].includes(endRoute || "") ? "100%" : "418px"};
  }
`;
