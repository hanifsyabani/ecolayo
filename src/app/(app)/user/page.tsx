import HeadingBanner from "@/components/user/heading-banner";
import ProductFeatured from "@/components/user/products/product-featured";

export default async function page() {
  return (
    <>
      <HeadingBanner />
      <ProductFeatured title="Popular Products"/>
    </>
  );
}
