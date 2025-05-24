import AdminProductDetail from "@/components/admin/products/detail-product-admin";

export default function page({ params }: any) {
  return (
    <>
      <AdminProductDetail id={params.id}/>
    </>
  )
}
