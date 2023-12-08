"use client";

import Button from "@/app/components/Button/Button";
import { PostModel } from "@/models";
import { Field } from "@/app/components";
import routes from "@/routes";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormikContext } from "formik";
import queryString from "query-string";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";

import { FormInterface } from "./Explore";
import Category from "./Upcoming/Category";
import Auth from "@/app/components/Auth/Auth";

export default function Upcoming() {
  //hooks
  const { values, setFieldValue } = useFormikContext<FormInterface>();
  const router = useRouter();

  //api
  const { data, error } = useSWR<{ category: string; events: PostModel[] }[]>(
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
          <Auth>
            {({ proceed, user }) => (
              <Button
                onClick={() => {
                  user ? router.push(routes.events.create) : proceed();
                }}
                className="text-xs !py-3 !px-5 !rounded-md"
              >
                <Plus size={20} />
                Add Event
              </Button>
            )}
          </Auth>
        </div>
        <Field.Search name="search" value={values.search} />
      </div>

      <div className="w-full border-2"></div>

      <div className="flex flex-col gap-11">
        {/* Loading state */}
        {!data &&
          !error &&
          Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} width="100%" height={110} />
          ))}

        {data?.map((category, index) => (
          <Category
            key={index}
            category={category.category}
            events={category.events}
          />
        ))}

        {(error || data) && (
          <div className="text-center italic">No more events</div>
        )}
      </div>
    </div>
  );
}
