"use client";

import { UserContext } from "@/Contexts/user";
import Editor, { EditorForm } from "@/app/components/Editor/Editor";
import { addPostService } from "@/services/post";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Page() {
  //hooks
  const { user } = useContext(UserContext);

  //navigation
  const router = useRouter();

  //functions
  const handleSubmit = (params: EditorForm, { setSubmitting }: FormikHelpers<EditorForm>) => {
    if (user) {
      setSubmitting(true);
      addPostService({ ...params, post_by: user.id })
        .then(() => {
          router.push("/home");
          toast.success("Success");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Editor onSubmit={handleSubmit} />
    </div>
  );
}
