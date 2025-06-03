import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SetupLayout() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin") {
    redirect("/admin");
  }
  redirect("/shop");
}
