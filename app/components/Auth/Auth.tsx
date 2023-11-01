"use client";

import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../Modal/Modal";
import RegisterForm from "./Forms/Register";
import LogInForm from "./Forms/Login";

export default function Auth({ children }: { children: React.ReactNode }) {
  //state
  const [view, setView] = useState<"register" | "log_in">("log_in");

  return (
    <Modal
      Toggler={() => <>{children}</>}
      modal_id="auth_modal"
      modalClassName="!w-full !max-w-[760px]"
    >
      <StyledWrapper>
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-medium">Welcome to CrowdCanvas</div>
          <div
            className="text-sm text-[#7F7F7F]"
            style={{ lineHeight: "31px" }}
          >
            Where ideas meet, and voices resonate. Join our dynamic community
            and be part of the creative flow
          </div>
        </div>

        <div>
          {view === "register" && (
            <>
              <RegisterForm />
              <div className="mt-5">
                Already have an account?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setView("log_in")}
                >
                  Log in.
                </span>
              </div>
            </>
          )}
          {view === "log_in" && (
            <>
              <LogInForm />
              <div className="mt-5">
                Don’t have an account?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setView("register")}
                >
                  Sign up
                </span>
              </div>
            </>
          )}{" "}
        </div>
      </StyledWrapper>
    </Modal>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 95px;

  @media (max-width: 480px) {
    padding: 95px 36px;
  }
`;
