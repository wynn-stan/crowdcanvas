"use client";

import { Container, Field } from "@/app/components";

import { useRouter } from "next/navigation";
import { Formik, useFormik } from "formik";
import styled from "styled-components";
import * as yup from "yup";

import Upcoming from "./Upcoming";

export interface FormInterface {
  start_date: Date;
  search: string;
}

export default function Explore() {
  const router = useRouter();

  return (
    <Container heading="Events">
      <Formik
        enableReinitialize
        validationSchema={yup.object({
          search: yup.string(),
        })}
        initialValues={{
          start_date: new Date(new Date().setHours(0, 0, 0, 0)),
          search: "",
        }}
        onSubmit={() => {
          //
        }}
      >
        {({ values, setFieldValue }) => (
          <>
            <div className="flex flex-col flex-wrap lg:flex-row gap-12">
              <Field.DatePicker
                selected={values.start_date}
                onChange={(date) => setFieldValue("start_date", date)}
                inline
              />
              <Upcoming />
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
}
