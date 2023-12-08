import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className, ...props }: Props) {
  return (
    <div
      className={`border border-gray-20 rounded-lg p-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
