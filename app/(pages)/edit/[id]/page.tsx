"use client";

import { Loader } from "@/app/components";
import Editor, { EditorForm } from "@/app/components/Editor/Editor";
import { PostModel } from "@/models";
import { updatePostService } from "@/services/post";
import { FormikHelpers } from "formik";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function Page() {
  //path
  const id = usePathname().split("/").slice(-1)[0];

  //api
  const { data: post, error, mutate } = useSWR<PostModel>(`/api/posts/${id}`);

  //navigation
  const router = useRouter();

  //handle submit
  const handleSubmit = (
    { title, description }: EditorForm,
    { setSubmitting }: FormikHelpers<EditorForm>
  ) => {
    setSubmitting(true);
    updatePostService(id, { title, description })
      .then(() => {
        mutate();
        router.push(`/home/post/${id}`);
      })
      .catch((err) =>
        toast.error("Something unexpected happened. Please try again")
      );
  };

  return post ? (
    <Editor onSubmit={handleSubmit} defaultValues={post} />
  ) : (
    <Loader size="lg" />
  );
}
