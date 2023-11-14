import { Button } from "@restart/ui";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  //functions
  const goToDashboard = () => router.push("/");

  return (
    <div className="flex items-center justify-between py-3 px-8">
      <div onClick={goToDashboard}>
        <ArrowLeftIcon />
      </div>
      <div className="flex gap-6">
        <Button
          className="py-2 px-5 border border-blue text-blue rounded"
          onClick={goToDashboard}
        >
          Cancel
        </Button>
        <Button
          className="py-2 px-5 bg-blue text-white rounded"
          onClick={goToDashboard}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
