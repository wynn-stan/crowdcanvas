"use client";

interface Props {
  variant?: "dots" | "bars" | "ring" | "spinner" | "ball" | "infinity";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({
  variant = "spinner",
  size = "xs",
  className,
}: Props) {
  return (
    <span
      className={`loading loading-${variant} loading-${size} ${className}`}
    ></span>
  );
}
