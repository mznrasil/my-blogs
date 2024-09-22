import { createUser, getUserByID } from "@/services/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Something went wrong!!");
  }

  const gotUser = await getUserByID(user.id);
  if (!gotUser) {
    await createUser({
      id: user.id,
      first_name: user.given_name ?? "",
      last_name: user.family_name ?? "",
      email: user?.email ?? "",
      profile_image:
        user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
    });
  }

  return NextResponse.redirect("http://localhost:3000/dashboard");
}
