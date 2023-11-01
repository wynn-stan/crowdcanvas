"use client";

import { emailRegex } from "@/app/utils";
import { Field, Formik } from "formik";
import styled from "styled-components";
import * as yup from "yup";

export default function LogInForm() {
  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({
        email: yup
          .string()
          .matches(emailRegex, "Enter a vailid email")
          .required(),
        password: yup.string().required("Password is required"),
      })}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {
        console.log("submit");
      }}
    >
      {({ values, handleSubmit, isSubmitting, isValid, setFieldValue }) => (
        <form className="">
          <div className="flex flex-col gap-7">
            <InputField type="email" label="Email" name="email" />

            <InputField type="password" label="Password" name="password" />
          </div>

          <button className="mt-8 px-[60px] py-[12px] bg-blue-10 text-white rounded font-medium">
            Log in
          </button>
        </form>
      )}
    </Formik>
  );
}

function InputField({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-medium" htmlFor={name}>
        {label}
      </label>
      <Field
        type={type || "text"}
        name={name}
        className="bg-[#f5f6f7] border-[#E1E2E4] outline-0 py-2 px-4 h-[49px] font-normal"
      />
    </div>
  );
}
