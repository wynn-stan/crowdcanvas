import prisma from "@/prisma/db";
import { errorRes, successRes } from "../../(helpers)";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const params = req.nextUrl.searchParams;
    const post_id = params.get("post_id");

    const comments = post_id
      ? await prisma.comment.findMany({
          where: {
            created_for: post_id,
          },
          include: {
            author: true,
          },
        })
      : null;

    if (comments) {
      return successRes(comments);
    } else {
      return errorRes({ message: "No Posts", status: 404 });
    }
  } catch (err) {
    return errorRes({ err });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { content, created_by, created_for } = await req.json();
    const comment = await prisma.comment.create({
      data: {
        content,
        created_by,
        created_for,
      },
    });

    return successRes(comment);
  } catch (err) {
    return errorRes({ err });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const params = req.nextUrl.searchParams;
    const comment_id = params.get("comment_id");

    console.log("reach");

    if (comment_id) {
      const status = await prisma.comment.delete({
        where: {
          id: comment_id,
        },
      });
      return successRes(status);
    } else {
      return errorRes({ message: "No Posts", status: 403 });
    }
  } catch (err) {
    return errorRes({ err });
  }
}
