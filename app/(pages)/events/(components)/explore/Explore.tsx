"use client";

import { Container } from "@/app/components";
import Button from "@/app/components/Button/Button";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

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
              <StyledDatePicker>
                <DatePicker
                  selected={values.start_date}
                  onChange={(date) => setFieldValue("start_date", date)}
                  inline
                />
              </StyledDatePicker>

              <Upcoming />
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
}

const StyledDatePicker = styled.div`
  & .react-datepicker__day--outside-month {
    visibility: hidden;
  }
`;
