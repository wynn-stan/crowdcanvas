import { FormikErrors } from "formik";

export type ISetFieldValue<T = any> = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => Promise<void | FormikErrors<T>>;
