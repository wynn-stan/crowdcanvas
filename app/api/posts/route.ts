import prisma from "@/prisma/db";
import { errorRes, successRes } from "../(helpers)";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { title, description, post_by } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        description,
        post_by,
      },
    });
    return successRes(post);
  } catch (err) {
    return errorRes({ err });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    const posts = await prisma.post.findMany({
      where: {
        id: id ? id : undefined,
      },
      include: {
        author: true,
        comments: id ? true : false,
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
