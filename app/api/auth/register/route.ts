import prisma from "@/prisma/db";
import { errorRes, successRes } from "../../(helpers)";

export async function POST(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, password } = await req.json();
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password,
        profile_image_url: `https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=${first_name}_${last_name}`,
      },
      select: {
        first_name: true,
        last_name: true,
        id: true,
        profile_image_url: true,
      },
    });
    return successRes({ user });
  } catch (err) {
    return errorRes({ message: "Account already exists", status: 403 });
  }
}
