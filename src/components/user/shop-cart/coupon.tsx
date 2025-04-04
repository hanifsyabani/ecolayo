import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Coupon() {
  return (
    <Card className="mt-20">
      <CardContent className="p-4 flex justify-between items-center">
        <h1 className="font-semibold">Coupon Code</h1>
        <div className="flex items-center w-[70%]">
          <Input
            className="rounded-full px-3 py-2 border-gray-500 border"
            placeholder="Enter your code..."
          />
          <Button className="bg-gray-700 text-white hover:bg-gray-900">
            Apply Coupon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
