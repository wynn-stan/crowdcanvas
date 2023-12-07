import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={`flex gap-2 items-center bg-red px-5 py-[18px] text-white rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
