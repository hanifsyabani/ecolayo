import HeadingBanner from "@/components/user/heading-banner";
import ProductCategories from "@/components/user/products/product-categories";
import ProductFeatured from "@/components/user/products/product-featured";
import { shopServiceItem } from "@/lib/item";

export default async function page() {
  return (
    <div className="pb-20">
      <HeadingBanner />
      <div className="flex justify-evenly items-center gap-4 mb-10">
        {shopServiceItem.map((item) => (
          <div
            key={item.title}
            className="flex justify-center items-center gap-4 hover:shadow-lg cursor-pointer p-4"
          >
            <item.icon className="text-primary" />
            <div>
              <h1 className="text-sm font-semibold">{item.title}</h1>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ProductCategories/>
      <ProductFeatured title="Popular Products" />
    </div>
  );
}
