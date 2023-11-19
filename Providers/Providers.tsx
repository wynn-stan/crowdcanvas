"use client";

import { SWRConfig } from "swr";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import UserProvider from "../Contexts/user";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  //dayjs configs
  dayjs.extend(relativeTime);

  //swr config options
  const value = {
    fetcher: (key: string) => axios.get(key).then((res) => res.data),
  };

  return (
    <UserProvider>
      <SWRConfig value={value}>{children}</SWRConfig>
    </UserProvider>
  );
}
