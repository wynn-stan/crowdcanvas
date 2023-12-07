"use client";

import { Container, Field } from "@/app/components";
import Description from "../(components)/form/Description";
import { Formik } from "formik";
import { addEventService } from "@/services/event";
import { useContext } from "react";
import { UserContext } from "@/Contexts/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import DateTime from "../(components)/form/DateTime";
import EventType from "../(components)/form/EventType";

export interface SubComponentProps {
  values: any;
  setFieldValue: any;
  errors: any;
}

export interface FormValues {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  event_type: "In-Person" | "Virtual";
  address: string;
}

export default function Page() {
  //hooks
  const { user } = useContext(UserContext);

  //navigation
  const router = useRouter();

  return (
    <Formik
      enableReinitialize
      validationSchema={yup.object({
        title: yup.string().required("Title"),
        description: yup.string().required("Description"),
        start_date: yup.string().required("This"),
        end_date: yup.string().required("This"),
        event_type: yup.string().required("Event type"),
        address: yup.string().required("Address"),
      })}
      initialValues={{
        title: "",
        description: "",
        start_date: new Date(),
        end_date: new Date(),
        event_type: "In-Person",
        address: "",
      }}
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
    >
      {({ values, setFieldValue, errors, handleSubmit }) => (
        <Container.CreatorWrapper
          {...{
            onSubmit: () => handleSubmit(),
            isValid: true,
            isSubmitting: false,
          }}
        >
          <div className="flex flex-col gap-10 py-[52px] px-10 h-full">
            <Field.Input
              name="title"
              placeholder="Title..."
              className="!border-0 !p-0 text-3xl outline-none overflow-auto"
              showError
            />
            <div className="flex-grow flex flex-col gap-9">
              <div className="flex flex-col gap-9">
                <DateTime />
                <EventType />
              </div>
              <Description />
            </div>
          </div>
        </Container.CreatorWrapper>
      )}
    </Formik>
  );
}

/**
 * <input
      placeholder="Title..."
      className="text-3xl outline-none overflow-scroll"
      name="header"
      maxLength={190}
      value={values.title}
      onChange={(e) => setFieldValue("title", e.target.value)}
    />
 */
