import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import styled from "styled-components";

export default function DatePicker({
  withBorder = false,
  ...props
}: { withBorder?: boolean } & ReactDatePickerProps) {
  return (
    <StyledDatePicker withBorder={withBorder}>
      <ReactDatePicker {...props} />
    </StyledDatePicker>
  );
}

const StyledDatePicker = styled.div<{ withBorder: boolean }>`
  text-align: center;

  & .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  & .react-datepicker__day--today {
    background: #f2d9df;
    border-radius: 50%;
  }

  & .react-datepicker {
    font-family: "Poppins", sans-serif;
    ${({ withBorder }) => (withBorder ? "" : "border: 0;")}
    font-size: 14px;
  }

  & .react-datepicker__day--selected {
    background-color: #e64066;
    border-radius: 50%;
  }

  & .react-datepicker__header {
    background: white;
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & .react-datepicker__day-names {
    font-weight: 500;
    font-size: 14px;
  }
`;
