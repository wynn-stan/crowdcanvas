import * as yup from "yup";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const convertStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html.body;
};
