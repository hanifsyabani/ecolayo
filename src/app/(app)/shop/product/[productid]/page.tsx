import BottomDetailsProduct from "@/components/user/products/bottom-details-product";
import HeadDetailProduct from "@/components/user/products/head-detail-product";
import db from "@/lib/db";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: { productid: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: params.productid,
    },
    include: {
      images: true,
      tag: true,
      category: true,
    },
  });

  const safeProduct = product
    ? {
        ...product,
        price: product.price.toNumber(),
      }
    : null;

  return (
    <div className="w-full py-10">
      <div className="flex justify-center gap-4 px-4">
        <div className="w-1/2 h-full flex justify-center items-center">
          {product?.images &&
          product?.images.length > 0 &&
          product?.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              width={200}
              height={200}
              alt={product.name}
              className="w-full h-full rounded-xl"
            />
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product?.name}</h1>

          <HeadDetailProduct product={safeProduct} />
        </div>
      </div>
      <BottomDetailsProduct product={safeProduct} />
    </div>
  );
}
