import FormEditProduct from "@/components/admin/products/form-edit-product";
import { Card, CardContent } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: {  productid: string };
}) {


  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormEditProduct id={params.productid} />
      </CardContent>
    </Card>
  );
}
