import { PostModel } from "@/models";
import routes from "@/routes";

import { BellRing, Globe, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import styled from "styled-components";

export default function Event({ event }: { event: PostModel }) {
  //navigation
  const router = useRouter();

  //variables
  const diff = dayjs(new Date()).diff(event.createdAt, "hour");
  const isHot = diff < 5;

  return (
    <StyledEvent
      onClick={() =>
        router.push(routes.events.detail.replace("[id]", event.id))
      }
      className="flex gap-5 rounded-md py-8 px-6 cursor-pointer"
    >
      {isHot && (
        <StyledHot className="flex items-center justify-center bg-red">
          <BellRing size={8} color="white" />
        </StyledHot>
      )}
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-2xl">
          {dayjs(event?.event?.start_date).format("h:mm A")}
        </span>
        <span className="font-medium text-sm text-gray-30">
          {dayjs(event?.event?.end_date).format("h:mm A")}
        </span>
      </div>

      <div className="flex flex-col">
        <div className="h-full border-2 "></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="line-clamp-2 font-medium text-base">{event.title}</div>
        <div className="flex gap-1 items-center text-gray-30">
          {event.event?.event_type === "In-Person" && <MapPin size={20} />}
          {event.event?.event_type === "Virtual" && <Globe size={20} />}
          <div className="text-xs font-medium ">{event.event?.address}</div>
        </div>
      </div>
    </StyledEvent>
  );
}

const StyledEvent = styled.div`
  position: relative;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledHot = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
