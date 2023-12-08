"use client";

import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Auth from "../Auth/Auth";
import Button from "../Button/Button";

export default function Nav({
  onSubmit,
  isSubmitting,
  isValid,
}: {
  onSubmit: (props: any) => void;
  isSubmitting: boolean;
  isValid: boolean;
}) {
  const router = useRouter();

  //functions
  const goBack = () => router.back();

  return (
    <div className="flex items-center justify-between py-3 px-8">
      <div className="cursor-pointer" onClick={goBack}>
        <ArrowLeftIcon />
      </div>
      <div className="flex gap-6">
        <Button
          className="!py-2 !px-5 !border !border-blue !text-blue !rounded !bg-white"
          onClick={goBack}
        >
          Cancel
        </Button>
        <Auth>
          {({ user, proceed }) => (
            <Button
              className={`!py-2 !px-5 !bg-blue !text-white !rounded ${
                !isValid ? "!bg-blue-20" : ""
              }`}
              {...(user
                ? {
                    onClick: onSubmit,
                  }
                : {
                    onClick: () => proceed(),
                  })}
              {...{ isValid, isSubmitting }}
            >
              Publish
            </Button>
          )}
        </Auth>
      </div>
    </div>
  );
}
