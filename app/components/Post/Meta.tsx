import { PostModel } from "@/models";
import dayjs from "dayjs";
import { CalendarDays, Clock3, Globe, MapPin } from "lucide-react";
import { HTMLAttributes } from "react";

function Meta({
  item,
  children,
  truncateAddress = true,
}: {
  item: PostModel;
  children?: React.ReactNode;
  truncateAddress?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {item.event?.event_type === "In-Person" && (
        <Item Icon={MapPin}>
          <div className={`${truncateAddress && "md:max-w-[90px] truncate"}`}>
            {item?.event?.address}{" "}
          </div>
        </Item>
      )}

      {item.event?.event_type === "Virtual" && (
        <Item Icon={Globe}>
          <div className={`${truncateAddress && "md:max-w-[90px] truncate"}`}>
            {item?.event?.address}{" "}
          </div>
        </Item>
      )}

      <Item Icon={CalendarDays}>
        {dayjs(item?.event?.start_date).format("ddd, D MMM YYYY")}
      </Item>

      <Item Icon={Clock3}>
        <div className="flex gap-1">
          {dayjs(item?.event?.start_date).format("h:mm A")}
          <span>-</span>
          {dayjs(item?.event?.end_date).format("h:mm A")}
        </div>
      </Item>

      {children}
    </div>
  );
}

function Item({
  Icon,
  children,
  ...props
}: {
  Icon: any;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex gap-1 items-center text-gray-30`} {...props}>
      <Icon size={20} />
      <div className="text-black font-medium">{children}</div>
    </div>
  );
}

export default Object.assign(Meta, { Item });
