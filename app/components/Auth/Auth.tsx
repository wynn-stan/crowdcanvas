"use client";

import React, { useContext, useState } from "react";
import styled from "styled-components";

import Modal from "../Modal/Modal";
import RegisterForm from "./Forms/Register";
import LogInForm from "./Forms/Login";
import { X } from "lucide-react";
import { UserContext } from "@/Contexts/user";
import { UserModel } from "@/models";

type View = "register" | "log_in";
interface Props {
  children: (props: {
    proceed: () => void;
    onHide: () => void;
    user: UserModel | null;
  }) => React.ReactElement;
  defaultView?: View;
}

export default function Auth({ children, defaultView = "log_in" }: Props) {
  //state
  const [view, setView] = useState<View>(defaultView);
  const [show, setShow] = useState(false);

  //functions
  const onHide = () => setShow(false);

  //hooks
  const { user } = useContext(UserContext);

  return (
    <>
      <>{children({ proceed: () => setShow(true), onHide, user })}</>
      <Modal
        show={show}
        onHide={onHide}
        modalClassName="!w-full !max-w-[760px] h-fit min-h-[652px] max-h-full overflow-auto"
      >
        <div
          className="w-full py-6 md:px-[95px] xs:px-[36px] flex justify-end cursor-pointer"
          onClick={onHide}
        >
          <X />
        </div>
        <StyledWrapper>
          <div className="flex flex-col gap-4">
            <div className="text-4xl font-medium">Welcome to CrowdCanvas</div>
            <div className="text-sm text-[#7F7F7F]" style={{ lineHeight: "31px" }}>
              Where ideas meet, and voices resonate. Join our dynamic community and be part of the creative
              flow
            </div>
          </div>

          <div className="mb-10">
            {view === "register" && (
              <>
                <RegisterForm onHide={onHide} />
                <div className="mt-5">
                  Already have an account?{" "}
                  <span className="cursor-pointer underline" onClick={() => setView("log_in")}>
                    Log in.
                  </span>
                </div>
              </>
            )}
            {view === "log_in" && (
              <>
                <LogInForm onHide={onHide} />
                <div className="mt-5">
                  Don’t have an account?{" "}
                  <span className="cursor-pointer underline" onClick={() => setView("register")}>
                    Sign up
                  </span>
                </div>
              </>
            )}
          </div>
        </StyledWrapper>
      </Modal>
    </>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 40px 95px;
  padding-top: 10px;

  @media (max-width: 480px) {
    padding: 40px 36px;
    padding-top: 10px;
  }
`;
