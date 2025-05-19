import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default async function Navbar() {
  return (
    <>
      <nav className="py-2 px-3 flex gap-32 items-center bg-white">

        <div className="flex items-center justify-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
        <div className="flex items-center gap-3"></div>
      </nav>
    </>
  );
}
