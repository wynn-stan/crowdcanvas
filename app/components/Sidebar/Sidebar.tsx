"use client";

import { useContext, useState, Dispatch, SetStateAction } from "react";
import {
  Home,
  LucideIcon,
  Settings,
  LogIn,
  Plus,
  CalendarDays,
} from "lucide-react";
import styled from "styled-components";
import { useWindowWidth } from "@react-hook/window-size";
import { usePathname, useRouter } from "next/navigation";

import { UserContext } from "../../../Contexts/user";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";
import routes from "@/routes";

interface TabItems {
  [key: string]: {
    label: string;
    Icon: LucideIcon;
  };
}

interface ChildrenProps {
  user: any;
  setUser: React.Dispatch<any>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabItems: TabItems;
}

interface Props {
  children: ({
    user,
    setUser,
    activeTab,
    setActiveTab,
    tabItems,
  }: ChildrenProps) => JSX.Element;
}

export default function Wrapper() {
  //hooks
  const { user, setUser } = useContext(UserContext);
  const activePath = usePathname().split("/")[1];

  //tabs
  const [activeTab, setActiveTab] = useState(activePath);

  const tabItems: TabItems = {
    home: {
      label: "Home",
      Icon: Home,
    },
    events: {
      label: "Events",
      Icon: CalendarDays,
    },
  };

  //width
  const width = useWindowWidth();
  const isTablet = width <= 834;

  //routing
  const router = useRouter();

  return (
    <StyledSidebar
      data-isTablet={isTablet}
      className="border-r-2 border-gray-20"
    >
      <div className="flex flex-col gap-12 ">
        {!isTablet && (
          <div
            style={{ letterSpacing: "-2%" }}
            className="font-medium text-2xl text-center w-full"
          >
            CrowdCanvas
          </div>
        )}
        <div>
          {Object.keys(tabItems).map((key, index) => {
            const { label, Icon } = tabItems[key];
            return (
              <div
                className={` flex gap-5 py-8 px-9 cursor-pointer ${
                  key === activeTab ? "bg-[#d9d9d9]" : ""
                } `}
                key={index}
                onClick={() => {
                  setActiveTab(key);
                  router.push((routes as any)?.[key]?.index);
                }}
              >
                <Icon />
                {!isTablet && <span>{label}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        {user ? (
          <Button onClick={() => router.push("/create")}>
            {isTablet ? <Plus /> : "New Post"}
          </Button>
        ) : (
          <Auth>
            {({ proceed }) => (
              <Button className="!bg-blue" onClick={() => proceed()}>
                {isTablet ? <LogIn /> : "Log In"}
              </Button>
            )}
          </Auth>
        )}
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  max-width: ${(props: any) => (props["data-isTablet"] ? "90px" : "250px")};
  width: 100%;

  padding: 56px 0;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
