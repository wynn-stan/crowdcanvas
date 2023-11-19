"use client";

import { ErrorMessage, Field, Formik } from "formik";
import styled from "styled-components";
import { useContext } from "react";
import * as yup from "yup";

import { emailRegex } from "../../../../utils";
import { UserContext } from "../../../../Contexts/user";
import axios from "axios";
import { toast } from "react-toastify";
import { UserModel } from "@/models";

interface Props {
  onHide: () => void;
}

export default function RegisterForm({ onHide }: Props) {
  const { setUser } = useContext(UserContext);

  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        email: yup.string().matches(emailRegex, "Enter a vailid email").required(),
        password: yup.string().required("Password is required"),
        confirm_password: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
      })}
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={(params, { setSubmitting }) => {
        axios
          .post("/api/auth/register", params)
          .then(({ data }: { data: { user: UserModel } }) => {
            setUser(data.user);
            onHide();
            toast.success("Success");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      }}
    >
      {({ values, handleSubmit, isSubmitting, isValid, setFieldValue, errors }) => (
        <form onSubmit={(e) => e.preventDefault()}>
          ={" "}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col sm:flex-row gap-7 sm:gap-9">
              <InputField name="first_name" label="First Name" errors={errors} />
              <InputField name="last_name" label="Last Name" errors={errors} />
            </div>

            <InputField type="email" label="Email" name="email" errors={errors} />

            <div className="flex flex-col sm:flex-row gap-7 sm:gap-9">
              <InputField type="password" label="Password" name="password" errors={errors} />
              <InputField
                type="password"
                label="Confirm password"
                name="confirm_password"
                errors={errors}
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="mt-8 px-[60px] py-[12px] bg-blue-10 text-white rounded font-medium"
          >
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
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  errors: { [key: string]: any };
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[13px] font-medium" htmlFor={name}>
        {label}
      </label>
      <Field
        type={type || "text"}
        name={name}
        className="bg-[#f5f6f7] border-[#E1E2E4] outline-0 py-2 px-4 h-[49px] font-normal"
      />
      <ErrorMessage name={name} />
    </div>
  );
}
