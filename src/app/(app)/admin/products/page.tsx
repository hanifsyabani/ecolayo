import ListProducts from "@/components/admin/products/list-products";
import { Card, CardContent } from "@/components/ui/card";
export default async function page() {
  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <ListProducts />
      </CardContent>
    </Card>
  );
}
