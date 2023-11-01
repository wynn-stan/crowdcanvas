"use client";

import { LogIn, Menu, Plus, X } from "lucide-react";
import styled from "styled-components";
import Wrapper from "./Wrapper/Wrapper";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";

export default function CollapsedSidebar() {
  return (
    <div className="drawer w-fit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="">
          <Menu />
        </label>
      </div>
      <div className="drawer-side">
        <CloseSideBar />
        <Wrapper>
          {({ activeTab, setActiveTab, setUser, tabItems, user }) => (
            <StyledDrawerSide>
              <div className="flex flex-col gap-12">
                {/* Header */}
                <div
                  style={{ letterSpacing: "-2%" }}
                  className="flex justify-between font-medium text-2xl px-9"
                >
                  <span>CrowdCanvas</span>
                  <CloseSideBar withIcon />
                </div>

                <div>
                  {Object.keys(tabItems).map((key, index) => {
                    const { label, Icon } = tabItems[key];
                    return (
                      <div
                        className={` flex gap-5 py-8 px-9 cursor-pointer ${
                          key === activeTab ? "bg-[#d9d9d9]" : ""
                        } `}
                        key={index}
                        onClick={() => setActiveTab(key)}
                      >
                        <Icon />
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                {user ? (
                  <Button onClick={() => setUser(null)}>Log out</Button>
                ) : (
                  <Auth>
                    <Button className="!bg-blue">Log In</Button>
                  </Auth>
                )}
              </div>
            </StyledDrawerSide>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

const CloseSideBar = ({ withIcon }: { withIcon?: boolean }) => {
  return (
    <label
      htmlFor="my-drawer"
      aria-label="close sidebar"
      className="drawer-overlay"
    >
      {withIcon && <X />}
    </label>
  );
};

const StyledDrawerSide = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: white;

  padding: 56px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
