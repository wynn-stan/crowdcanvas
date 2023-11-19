"use client";

import { UserContext } from "@/Contexts/user";
import Auth from "@/app/components/Auth/Auth";
import { addCommentService } from "@/services/post";
import { Button } from "@restart/ui";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ArrowRight, Loader2, LoaderIcon } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function CommentForm({
  post_id,
  mutate,
  mutatePost,
}: {
  post_id?: string;
  mutate: () => void;
  mutatePost: () => void;
}) {
  const { user } = useContext(UserContext);

  return (
    <Formik
      validateOnMount
      initialValues={{ content: "" }}
      onSubmit={({ content }, { setSubmitting }) => {
        post_id &&
          user &&
          addCommentService({ content, created_for: post_id, created_by: user.id })
            .then((data) => {
              mutate();
              mutatePost();
              toast.success("Success");
            })
            .catch((err) => console.log(err))
            .finally(() => setSubmitting(false));
      }}
    >
      {({ values, handleSubmit, isSubmitting }) => (
        <StyledForm className="bg-gray-20" onSubmit={(e) => e.preventDefault()}>
          <Field
            className="w-full bg-gray-20 outline-none text-sm"
            name="content"
            maxLength={190}
            placeholder="Add a comment"
          />
          {isSubmitting ? (
            <LoaderIcon />
          ) : (
            <Auth>
              {({ proceed, user }) => (
                <Button
                  onClick={() => {
                    user ? handleSubmit() : proceed();
                  }}
                >
                  <ArrowRight />
                </Button>
              )}
            </Auth>
          )}
        </StyledForm>
      )}
    </Formik>
  );
}

const StyledForm = styled(Form)`
  width: 100%;
  border-radius: 35px;
  display: flex;
  justify-content: between;
  gap: 16px;

  padding: 18px 24px;
`;
