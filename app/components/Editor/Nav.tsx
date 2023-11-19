import { Button } from "@restart/ui";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const goToDashboard = () => router.push("/");

  return (
    <div className="flex items-center justify-between py-3 px-8">
      <div className="cursor-pointer" onClick={goToDashboard}>
        <ArrowLeftIcon />
      </div>
      <div className="flex gap-6">
        <Button className="py-2 px-5 border border-blue text-blue rounded" onClick={goToDashboard}>
          Cancel
        </Button>
        <Button
          disabled={!isValid}
          className={`py-2 px-5 bg-blue text-white rounded ${!isValid ? "bg-blue-20" : ""}`}
          onClick={onSubmit}
        >
          {isSubmitting ? <LoaderIcon /> : "Publish"}
        </Button>
      </div>
    </div>
  );
}
