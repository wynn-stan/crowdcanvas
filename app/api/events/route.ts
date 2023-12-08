import prisma from "@/prisma/db";
import { errorRes, successRes } from "../(helpers)";
import { NextRequest, NextResponse } from "next/server";

interface ReformattedEvents {
  category: Date | undefined;
  events: any[];
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id") || undefined;
    const start_date = new Date(params.get("start_date") || "") || undefined;
    const search = params.get("search") || undefined;

    const events = await prisma.post.findMany({
      where: {
        post_type: "event",
        event: { id, start_date: { gte: start_date } },
        title: { contains: search },
      },
      orderBy: [{ event: { start_date: "asc" } }],
      include: {
        author: {
          select: {
            profile_image_url: true,
            first_name: true,
            last_name: true,
          },
        },
        event: true,
        comments: id ? true : false,
        _count: {
          select: { comments: true },
        },
      },
    });

    if (events.length) {
      //reduce function
      const reformattedEvents = events.reduce(
        (persisted_variable: ReformattedEvents[], current_array_item) => {
          //check if category exists
          const category = persisted_variable.findIndex((item: any) => {
            if (item?.category && current_array_item?.event?.start_date) {
              //compare only the dates not time

              const category_date = (new Date(item.category)).setHours(0,0,0,0); //prettier-ignore
              const item_date = (new Date( current_array_item.event.start_date)).setHours(0,0,0,0); //prettier-ignore

              return category_date === item_date;
            } else {
              return false;
            }
          });

          if (category >= 0) {
            persisted_variable[category].events.push(current_array_item);
          } else {
            persisted_variable.push({
              category: current_array_item.event?.start_date,
              events: [current_array_item],
            });
          }
          return persisted_variable;
        },
        []
      );

      return successRes(reformattedEvents);
    } else {
      return errorRes({ message: "No Events found", status: 404 });
    }
  } catch (err) {
    console.log(err);
    return errorRes({ err });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      post_by,
      event_type,
      address,
      start_date,
      end_date,
    } = await req.json();

    const post = await prisma.post.create({
      data: { title, description, post_by, post_type: "event" },
    });

    const event = await prisma.event.create({
      data: {
        event_type,
        address,
        start_date,
        end_date,
        related_post: post.id,
      },
    });

    return successRes({ message: "event created", event });
  } catch (err) {
    console.log(err);
    return errorRes({ err });
  }
}
