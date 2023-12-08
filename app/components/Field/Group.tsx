"use client";

import { Field, FieldProps } from "formik";
import { HTMLAttributes } from "react";
import Error from "./Error";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label: String;
  LabelIcon?: any;
  name: String;
  className?: string;
}

export default function Group({
  children,
  label,
  name,
  LabelIcon,
  className,
  ...props
}: Props) {
  return (
    <Field name={name} label={label}>
      {({ form, meta }: FieldProps) => (
        <div className={`flex flex-col gap-2 ${className}`} {...props}>
          <div className="font-medium text-base flex gap-1 items-center">
            <span>{LabelIcon && <LabelIcon size={16} />}</span>
            <span>{label}</span>
          </div>
          {children}
          {meta.touched && meta.error && <Error>{meta.error}</Error>}
        </div>
      )}
    </Field>
  );
}
