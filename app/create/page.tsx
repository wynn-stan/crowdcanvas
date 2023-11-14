"use client";

import { Button } from "@restart/ui";
import { ArrowLeftIcon } from "lucide-react";
import Toolbar from "./(components)/Toolbar";
import styled from "styled-components";
import Nav from "./(components)/Nav";
import Editor from "./(components)/Editor";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <Nav />

      <Editor />
    </div>
  );
}
