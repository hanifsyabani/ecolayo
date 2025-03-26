import FormAddProduct from "@/components/admin/products/form-add-product";
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
    <div className="px-8 mt-6 pb-20">
      <FormAddProduct products={safeProduct} categories={categories} />
    </div>
  );
}
