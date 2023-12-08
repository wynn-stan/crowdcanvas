import { Field } from "@/app/components";
import Toolbar from "@/app/components/Editor/Toolbar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useFormikContext } from "formik";
import { FormValues } from "./Index";

export default function Description() {
  //hooks
  const { values, setFieldValue, errors } = useFormikContext<FormValues>();

  //editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline.configure(),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "italic underline text-red",
        },
      }),
    ],
    content: values.description,
    onUpdate: ({ editor }: any) => {
      setFieldValue("description", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "text-base outline-none h-full",
        placeholder: "Your description...",
      },
    },
  });

  return (
    <Field.Group label="Description" name="description" className="h-full">
      <Field.Wrapper className="!p-0 h-full">
        <Toolbar editor={editor} />
        <div className="px-5 py-8 h-full">
          <EditorContent editor={editor} />
        </div>
      </Field.Wrapper>
    </Field.Group>
  );
}
