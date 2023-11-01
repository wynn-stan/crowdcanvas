"use client";

import { emailRegex } from "@/app/utils";
import { Field, Formik } from "formik";
import styled from "styled-components";
import * as yup from "yup";

export default function RegisterForm() {
  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        email: yup
          .string()
          .matches(emailRegex, "Enter a vailid email")
          .required(),
        password: yup.string().required("Password is required"),
        confirm_password: yup
          .array()
          .oneOf([yup.ref("password")], "Passwords must match"),
      })}
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={() => {
        console.log("submit");
      }}
    >
      {({ values, handleSubmit, isSubmitting, isValid, setFieldValue }) => (
        <form className="">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col sm:flex-row gap-7 sm:gap-9">
              <InputField name="first_name" label="First Name" />
              <InputField name="last_name" label="Last Name" />
            </div>

            <InputField type="email" label="Email" name="email" />

            <div className="flex flex-col sm:flex-row gap-7 sm:gap-9">
              <InputField type="password" label="Password" name="password" />
              <InputField
                type="password"
                label="Confirm password"
                name="confirm_password"
              />
            </div>
          </div>

          <button className="mt-8 px-[60px] py-[12px] bg-blue-10 text-white rounded font-medium">
            Create account
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
