"use client";

import UserProvider from "../Contexts/user";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <UserProvider>{children}</UserProvider>;
}
