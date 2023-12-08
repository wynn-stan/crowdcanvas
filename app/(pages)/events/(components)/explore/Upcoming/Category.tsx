import { PostModel } from "@/models";
import dayjs from "dayjs";
import Event from "./Event";

export default function Category({
  category,
  events,
}: {
  category: string;
  events: PostModel[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-base font-medium">
        {dayjs(category).format("ddd, MMMM D YYYY")}
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <Event event={event} key={index} />
        ))}
      </div>
    </div>
  );
}
