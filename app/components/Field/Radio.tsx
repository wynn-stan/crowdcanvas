"use client";

import { Field, FieldProps, useFormikContext } from "formik";
import styled from "styled-components";
import Wrapper from "./Wrapper";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
}

export default function Radio({ name, value, label, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Wrapper>
      <StyledLabel
        htmlFor={value}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          className="radio__input"
          name={name}
          id={value}
          value={value}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
          }}
          {...props}
        />
        <div className="radio__custom"></div>
        <div>{value}</div>
      </StyledLabel>
    </Wrapper>
  );
}

const StyledLabel = styled.label`
  .radio__input {
    display: none;
  }

  & .radio__custom {
    border: 1px solid #82818f;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    padding: 4px;
  }

  & .radio__custom::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: white;
    display: block;
  }

  .radio__input:checked + .radio__custom {
    border: 0;
    background-color: #e64066;
  }
`;
