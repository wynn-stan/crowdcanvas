"use client";

import { useContext, useState, Dispatch, SetStateAction } from "react";
import { CalendarDays, Home, LucideIcon, Settings } from "lucide-react";

import { UserContext } from "../../../../Contexts/user";
import { usePathname } from "next/navigation";

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

  //hooks
  const activePath = usePathname().split("/")[1];

  //tabs
  const [activeTab, setActiveTab] = useState(activePath || "home");

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
