import FormAddProduct from "@/components/admin/products/form-add-product";
import { Card, CardContent } from "@/components/ui/card";
import db from "@/lib/db";

export default async function page({
  params,
}: {
  params: {  productid: string };
}) {


  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormAddProduct id={params.productid} />
      </CardContent>
    </Card>
  );
}
