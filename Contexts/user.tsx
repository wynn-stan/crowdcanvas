"use client";

import { UserModel } from "@/models";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
}>({ user: null, setUser: () => null });

export default function User({ children }: Props) {
  //user setup
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const user = window.sessionStorage.getItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"] || ""
      );
      if (user) return JSON.parse(user);
    } else {
      return null;
    }
  });

  useEffect(() => {
    //when the user data changes, update the sessionStorage.
    if (user) {
      sessionStorage.setItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"] || "",
        JSON.stringify(user)
      );
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
