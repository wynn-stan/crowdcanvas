import prisma from "@/prisma/db";
import { errorRes, successRes } from "../../(helpers)";

export async function POST(req: Request, res: Response) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
      select: {
        first_name: true,
        last_name: true,
        id: true,
        profile_image_url: true,
      },
    });
    if (user) {
      return successRes({ user });
    } else {
      return errorRes({ message: "Account not found", status: 404 });
    }
  } catch (err) {
    return errorRes({ err });
  }
}
