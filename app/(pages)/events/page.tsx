import { redirect } from "next/navigation";

export default function Page() {
  redirect("/events/explore");
  return <></>;
}
