"use client";

import Nav from "../Editor/Nav";

interface Props {
  onSubmit: (props: any) => void;
  isSubmitting: boolean;
  isValid: boolean;
  children: React.ReactNode;
}

export default function CreatorWrapper({
  children,
  onSubmit,
  isSubmitting,
  isValid,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <Nav onSubmit={onSubmit} {...{ isSubmitting, isValid }} />

      {children}
    </div>
  );
}
