import React from "react";
import PostList from "./(components)/PostList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full">
      <PostList />
      {children}
    </main>
  );
}
