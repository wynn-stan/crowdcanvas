"use client";

import { HTMLAttributes } from "react";
import Wrapper from "./Wrapper";
import { ISetFieldValue } from "@/interfaces";
import { Field, FieldProps } from "formik";
import Error from "./Error";

interface Props {
  wrapperClassName?: string;
  value: string;
  name: string;
}

export default function Search({
  wrapperClassName,
  value,
  name,
  ...props
}: Props) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <>
          <Wrapper className={`bg-gray-15 ${wrapperClassName}`}>
            <input
              {...field}
              type="text"
              placeholder="Search event name..."
              className="outline-none w-full bg-gray-15 "
            />
          </Wrapper>

          {meta.touched && meta.error && <Error>{meta.error}</Error>}
        </>
      )}
    </Field>
  );
}
