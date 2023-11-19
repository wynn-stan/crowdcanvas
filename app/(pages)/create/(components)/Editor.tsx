import styled from "styled-components";
import { Field, Formik, FieldProps, useFormik } from "formik";
import * as yup from "yup";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import Toolbar from "./Toolbar";
import Nav from "./Nav";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "@/Contexts/user";

export default function Editor() {
  const { user } = useContext(UserContext);

  //formik
  const formik = useFormik({
    initialValues: {
      title: "Gutenberg",
      description: "Write your thoughts...",
    },
    onSubmit: (values) => {
      axios
        .post("/api/posts", { ...values, post_by: user?.id })
        .then((data) => {
          toast.success("Success");
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });

  //editor
  const editor = useEditor({
    extensions: [StarterKit.configure(), Underline.configure()],
    content: formik.values.description,
    onUpdate: ({ editor }: any) => {
      formik.setFieldValue("description", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "text-base leading-7 h-full outline-none",
        placeholder: "Description",
      },
    },
  });

  if (!editor) return null;

  return (
    <>
      <Nav onSubmit={formik.handleSubmit} />

      <Toolbar editor={editor} />

      <div className="w-full h-full flex flex-col items-center">
        <StyledEditor>
          <input
            placeholder="Title..."
            className="text-3xl"
            name="header"
            value={formik.values.title}
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
          />
          <EditorContent editor={editor} />
        </StyledEditor>
      </div>
    </>
  );
}

const StyledEditor = styled.div`
  overflow: auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 48px;

  padding: 98px 0px;
  height: 100%;

  & div {
    height: 100%;
  }

  @media (max-width: 480px) {
    max-width: 310px;
  }

  @media (max-width: 834px) {
    max-width: 416px;
  }

  @media (min-width: 840px) {
    max-width: 642px;
  }
`;
