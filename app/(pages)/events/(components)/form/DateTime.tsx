"use client";

import { Field } from "@/app/components";
import { type FormValues } from "./Index";
import { useFormikContext } from "formik";

export default function DateTime() {
  const { values, setFieldValue, errors } = useFormikContext<FormValues>();

  console.log(errors);

  return (
    <div className="flex flex-wrap gap-9">
      <Field.Group name="start_date" label="Date">
        <Field.Wrapper>
          <Field.DatePicker
            selected={values.start_date}
            onChange={(date) => {
              setFieldValue("start_date", date);
              setFieldValue("end_date", date);
            }}
            dateFormat="dd-MMM-yyyy"
            className="outline-none w-full"
            withBorder
          />
        </Field.Wrapper>
      </Field.Group>

      <Field.Group name="start_date" label="Time">
        <div className="flex items-center gap-2  w-full">
          <Field.Wrapper>
            <Field.DatePicker
              selected={values.start_date}
              onChange={(date) => setFieldValue("start_date", date)}
              className="outline-none w-full"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              withBorder
            />
          </Field.Wrapper>

          <div>-</div>

          <Field.Wrapper>
            <Field.DatePicker
              selected={values.end_date}
              onChange={(date) => setFieldValue("end_date", date)}
              className="outline-none w-full"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              withBorder
            />
          </Field.Wrapper>
        </div>
      </Field.Group>
    </div>
  );
}
