"use client";

import { Field } from "@/app/components";
import { FormValues, SubComponentProps } from "../../create/page";
import styled from "styled-components";
import { HTMLAttributes } from "react";
import { useFormikContext } from "formik";

export default function EventType() {
  //hooks
  const { values, setFieldValue } = useFormikContext<FormValues>();

  //variables
  const options = ["In-Person", "Virtual"];

  return (
    <div className="flex flex-wrap gap-9">
      <Field.Group name="event_type" label="Event type">
        <div className="!border-0 !p-0 flex gap-2">
          {options.map((item, index) => (
            <Field.Radio
              key={index}
              name="event_type"
              value={item}
              label={item}
              defaultChecked={values.event_type === item}
            />
          ))}
        </div>
      </Field.Group>

      {values.event_type === "In-Person" && (
        <Field.Group name="address" label="Location">
          <Field.Input name="address" placeholder="eg. Oxford Street, Osu" />
        </Field.Group>
      )}

      {values.event_type === "Virtual" && (
        <Field.Group name="address" label="Url">
          <Field.Input
            name="address"
            placeholder="eg. https://meet.google.com/"
          />
        </Field.Group>
      )}
    </div>
  );
}
