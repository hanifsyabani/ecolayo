import ClientTestimoni from "@/components/user/home/client-testimoni";
import HeadingBanner from "@/components/user/home/heading-banner";
import NewestProduct from "@/components/user/home/newest-product";
import ProductCategories from "@/components/user/home/product-categories";
import ProductFeatured from "@/components/user/home/product-featured";
import PromoteBanner from "@/components/user/home/promote-banner";
import Newsletter from "@/components/user/products/newsletter";
import { shopServiceItem } from "@/lib/item";

export default async function page() {
  return (
    <div className="pb-20">
      <HeadingBanner />
      <div className="flex justify-evenly items-center gap-4 mt-10 mb-16">
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
      <ProductCategories />
      <ProductFeatured title="Popular Products" />
      <PromoteBanner />
      <NewestProduct />
      <ClientTestimoni />
      <Newsletter isSosmed={false}/>
    </div>
  );
}
