"use client";

import { Field, FieldProps } from "formik";
import Wrapper from "./Wrapper";
import Error from "./Error";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  showError?: boolean;
}

export default function Input({ name, className, showError, ...props }: Props) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <div className="flex flex-col gap-2">
          <Wrapper className={`${className}`}>
            <input
              type="text"
              className="outline-none w-full"
              {...props}
              {...field}
            />
          </Wrapper>

          {showError && meta.touched && meta.error && (
            <Error>{meta.error}</Error>
          )}
        </div>
      )}
    </Field>
  );
}
