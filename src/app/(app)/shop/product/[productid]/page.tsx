import Product from "@/components/user/products/product";

export default async function page({
  params,
}: {
  params: { productid: string };
}) {
  return (
    <div className="w-full py-10">
      <Product id={params.productid} />
    </div>
  );
}
