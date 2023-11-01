"use client";

import { useContext, useState, Dispatch, SetStateAction } from "react";
import { Home, LucideIcon, Settings, LogIn, Plus } from "lucide-react";
import styled from "styled-components";
import { useWindowWidth } from "@react-hook/window-size";

import { UserContext } from "../../../Contexts/user";
import Button from "../../Button/Button";

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

export default function Wrapper({ children }: Props) {
  //context
  const { user, setUser } = useContext(UserContext);

  //tabs
  const [activeTab, setActiveTab] = useState("home");

  const tabItems: TabItems = {
    home: {
      label: "Home",
      Icon: Home,
    },
    settings: {
      label: "Settings",
      Icon: Settings,
    },
  };

  return <>{children({ activeTab, setActiveTab, setUser, tabItems, user })}</>;
}
