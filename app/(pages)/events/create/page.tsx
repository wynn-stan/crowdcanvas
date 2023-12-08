"use client";

import { useRouter } from "next/navigation";
import Form from "../(components)/form/Index";
import { useContext } from "react";
import { UserContext } from "@/Contexts/user";
import { addEventService } from "@/services/event";
import { toast } from "react-toastify";

export default function Page() {
  //hooks
  const { user } = useContext(UserContext);

  //navigation
  const router = useRouter();

  return (
    <Form
      onSubmit={(values, { setSubmitting }) => {
        if (user) {
          addEventService({ ...values, post_by: user.id })
            .then(() => {
              router.push("/home");
              toast.success("Event added successfully");
            })
            .catch((err) => {
              toast.error(err);
            })
            .finally(() => setSubmitting(false));
        }
      }}
    />
  );
}
