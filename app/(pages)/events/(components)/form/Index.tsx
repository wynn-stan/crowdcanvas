"use client";

import { Container, Field } from "@/app/components";
import Description from "./Description";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import DateTime from "./DateTime";
import EventType from "./EventType";
import { PostModel } from "@/models";

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
  event_type: string | "In-Person" | "Virtual";
  address: string;
}

export default function Form({
  post,
  onSubmit,
}: {
  post?: PostModel;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}) {
  //defaults
  const start_date = post?.event?.start_date
    ? new Date(post.event.start_date)
    : new Date();
  const end_date = post?.event?.end_date
    ? new Date(post.event.end_date)
    : new Date();

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
        title: post?.title || "",
        description: post?.description || "",
        start_date,
        end_date,
        event_type: post?.event?.event_type || "In-Person",
        address: post?.event?.address || "",
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        setFieldValue,
        errors,
        isValid,
        isSubmitting,
        handleSubmit,
      }) => (
        <Container.CreatorWrapper
          {...{
            onSubmit: () => handleSubmit(),
            isValid,
            isSubmitting,
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
