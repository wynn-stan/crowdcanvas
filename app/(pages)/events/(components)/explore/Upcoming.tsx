"use client";

import { Field } from "@/app/components";
import Button from "@/app/components/Button/Button";
import { ISetFieldValue } from "@/interfaces";
import { useFormikContext } from "formik";
import { Globe, MapPin, Plus } from "lucide-react";
import { FormInterface } from "./Explore";
import useSWR from "swr";
import queryString from "query-string";
import { EventModel, PostModel } from "@/models";
import dayjs from "dayjs";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import routes from "@/routes";

export default function Upcoming() {
  //hooks
  const { values, setFieldValue } = useFormikContext<FormInterface>();
  const router = useRouter();

  //api
  const { data, error } = useSWR<{ category: string; events: EventModel[] }[]>(
    `/api/events?${queryString.stringify({
      start_date: values.start_date,
      search: values.search,
    })}`
  );

  return (
    <div className="flex flex-col gap-7 w-full max-w-[612px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="font-medium text-2xl">Upcoming</div>
          <Button
            onClick={() => router.push(routes.events.create)}
            className="text-xs !py-3 !px-5 !rounded-md"
          >
            <Plus size={20} />
            Add Event
          </Button>
        </div>
        <Field.Search name="search" value={values.search} />
      </div>

      <div className="w-full border-2"></div>

      <div className="flex flex-col gap-11">
        {data?.map((category, index) => (
          <Category
            key={index}
            category={category.category}
            events={category.events}
          />
        ))}
      </div>
    </div>
  );
}

function Category({
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

function Event({ event }: { event: PostModel }) {
  const router = useRouter();

  return (
    <StyledEvent
      onClick={() =>
        router.push(routes.events.detail.replace("[id]", event.id))
      }
      className="flex gap-5 rounded-md py-8 px-6 cursor-pointer"
    >
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-2xl">
          {dayjs(event?.event?.start_date).format("h:mm A")}
        </span>
        <span className="font-medium text-sm text-gray-30">
          {dayjs(event?.event?.end_date).format("h:mm A")}
        </span>
      </div>

      <div className="h-full border-2"></div>

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
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;
