import FormAddProduct from "@/components/admin/products/form-add-product";
import { Card, CardContent } from "@/components/ui/card";
import db from "@/lib/db";

export default async function page({
  params,
}: {
  params: {storeid:string, productid:string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: params.productid,
    },
    include:{
      images:true,
      tag:true
    }
  }); 

  const categories = await db.category.findMany({
    where: {
      storeid: params.storeid,
    },
  });

  const safeProduct = product
  ? {
      ...product,
      price: product.price.toNumber(), 
    }
  : null;
  
  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormAddProduct products={safeProduct} categories={categories}/>
      </CardContent>
    </Card>
  );
}
