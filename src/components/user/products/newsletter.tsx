import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sosmed from "../sosmed";

interface NewsletterProps {
  isSosmed?: boolean;
}

export default function Newsletter({ isSosmed }: NewsletterProps) {
  return (
    <div className="flex items-center px-8 mt-20 ">
      <div className="w-[40%]">
        <h1 className="text-xl font-semibold">Subscribe our Newsletter</h1>
        <p className="text-sm text-gray-500 mt-2">
          {" "}
          Stay updated with our latest news, articles, and exclusive offers.
          Subscribe now and never miss an update!
        </p>
      </div>

      <div className="flex items-center justify-center w-1/2 gap-8">
        <div className="flex items-center">
          <Input
            placeholder="Enter your email adress"
            className="rounded-full w-80 bg-white"
          />
          <Button className="text-white rounded-full">Subscribe</Button>
        </div>
        {isSosmed && (
            <Sosmed />
        )}
      </div>
    </div>
  );
}
