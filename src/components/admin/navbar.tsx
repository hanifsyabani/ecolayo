import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function Navbar() {
  return (
    <>
      <nav className="py-2 px-3 flex gap-10 items-center bg-white">

        <div className="flex items-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
      </nav>
    </>
  );
}
