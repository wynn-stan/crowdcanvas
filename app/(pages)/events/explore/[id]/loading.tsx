import { Loader } from "@/app/components";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
