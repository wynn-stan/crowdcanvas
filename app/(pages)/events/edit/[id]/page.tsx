"use client";

import { usePathname, useRouter } from "next/navigation";
import Form from "../../(components)/form/Index";
import { useContext } from "react";
import { UserContext } from "@/Contexts/user";
import { updateEventService } from "@/services/event";
import { toast } from "react-toastify";
import useSWR from "swr";
import { PostModel } from "@/models";

export default function Page() {
  //hooks
  const { user } = useContext(UserContext);

  //navigation
  const router = useRouter();

  //path
  const id = usePathname().split("/").slice(-1)[0];

  //api
  const { data: post, error, mutate } = useSWR<PostModel>(`/api/posts/${id}`);

  return post ? (
    <Form
      post={post}
      onSubmit={(values, { setSubmitting }) => {
        if (user && post?.event) {
          updateEventService(post.event.id || "", {
            ...values,
            post_id: post.id,
          })
            .then(() => {
              router.back();
              toast.success("Event updated successfully");
            })
            .catch((err) => {
              toast.error(err);
            })
            .finally(() => setSubmitting(false));
        }
      }}
    />
  ) : (
    <>Loading...</>
  );
}
