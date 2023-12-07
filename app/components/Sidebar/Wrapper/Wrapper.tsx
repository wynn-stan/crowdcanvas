"use client";

import { useContext, useState, Dispatch, SetStateAction } from "react";
import { CalendarDays, Home, LucideIcon, Settings } from "lucide-react";

import { UserContext } from "../../../../Contexts/user";

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
    events: {
      label: "Events",
      Icon: CalendarDays,
    },
  };

  return <>{children({ activeTab, setActiveTab, setUser, tabItems, user })}</>;
}
