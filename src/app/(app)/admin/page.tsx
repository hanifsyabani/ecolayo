
import Statistics from "@/components/admin/home-dashboard";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");
  if(session.user.role !== "admin") redirect("/login");
  
  return (
    <>
      <h1 className="text-2xl font-semibold p-3">Admin Dashboard</h1>
      <div className="flex justify-evenly flex-wrap items-center">
        <Statistics/>
      </div>
    </>
  );
}
