import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isValid?: boolean;
  isSubmitting?: boolean;
}

export default function Button({
  children,
  className,
  isValid = true,
  isSubmitting,
  ...props
}: Props) {
  return (
    <button
      className={`flex gap-2 items-center bg-red px-5 py-[18px] text-white rounded-xl ${className} ${
        !isValid && "opacity-50"
      }`}
      disabled={!isValid}
      {...props}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
