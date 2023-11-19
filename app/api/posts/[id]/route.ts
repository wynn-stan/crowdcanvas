import { NextRequest, NextResponse } from "next/server";
import { errorRes, successRes } from "../../(helpers)";
import prisma from "@/prisma/db";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").slice(-1)[0];
    const { title, description } = await req.json();

    const updatedPost = await prisma.post.update({
      data: {
        title,
        description,
      },
      where: {
        id,
      },
    });

    return successRes({ post: updatedPost });
  } catch (err) {
    return errorRes({ err });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").slice(-1)[0];

    const posts = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            first_name: true,
            last_name: true,
            profile_image_url: true,
          },
        },
        comments: true,
      },
    });

    if (posts) {
      return successRes(posts);
    } else {
      return errorRes({ message: "No Posts", status: 404 });
    }
  } catch (err) {
    return errorRes({ err });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").slice(-1)[0];

    const status = await prisma.post.delete({
      where: {
        id,
      },
    });

    return successRes(status);
  } catch (err) {
    return errorRes({ err });
  }
}
