import { NextRequest, NextResponse } from "next/server";
import { errorRes, successRes } from "../../(helpers)";
import prisma from "@/prisma/db";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").slice(-1)[0];
    const {
      post_id,
      event_id,
      title,
      description,
      event_type,
      address,
      start_date,
      end_date,
    } = await req.json();

    const post = await prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        title,
        description,
      },
    });

    const event = await prisma.event.update({
      data: {
        event_type,
        address,
        start_date,
        end_date,
      },
      where: { id: event_id },
    });

    return successRes({ post, event });
  } catch (err) {
    return errorRes;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").slice(-1)[0];

    const events = await prisma.post.findMany({
      where: {
        event: {
          id,
        },
      },
      include: {
        author: {
          select: {
            profile_image_url: true,
            first_name: true,
            last_name: true,
          },
        },
        comments: true,
      },
    });

    if (events) {
      return successRes(events);
    } else {
      return errorRes({ message: "No Events found", status: 404 });
    }
  } catch (err) {
    return errorRes({ err });
  }
}
