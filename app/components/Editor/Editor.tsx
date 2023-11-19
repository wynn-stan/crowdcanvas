"use client";

import styled from "styled-components";
import { useFormik, FormikHelpers } from "formik";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import * as yup from "yup";

import Toolbar from "./Toolbar";
import Nav from "./Nav";

export interface EditorForm {
  title: string;
  description: string;
}

interface Props {
  onSubmit: (params: EditorForm, actions: FormikHelpers<EditorForm>) => void;
  defaultValues?: {
    title: string;
    description: string;
  };
}

export default function Editor({ onSubmit, defaultValues }: Props) {
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "Write your thoughts...",
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
    }),
    onSubmit,
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
        placeholder: "Description...",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full">
      <Nav
        onSubmit={formik.handleSubmit}
        {...{ isSubmitting: formik.isSubmitting, isValid: formik.isValid }}
      />

      <Toolbar editor={editor} />

      <div className="w-full h-full flex flex-col items-center px-5">
        <StyledEditor>
          <StyledInput
            placeholder="Title..."
            name="header"
            maxLength={190}
            value={formik.values.title}
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
          />
          <EditorContent editor={editor} />
        </StyledEditor>
      </div>
    </div>
  );
}

const StyledInput = styled.input`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  outline: 2px solid transparent;
  outline-offset: 2px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

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
