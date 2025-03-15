import db from "@/lib/db"
import Image from "next/image"

export default function page({params}: {params: {productid: string}}) {

  const product = db.product.findUnique({
    where:{
      id: params.productid
    }
  })
  return (
    <div>
      <Image src={'/Breadcrumbs.png'} width={100} height={100} className="w-full" alt="breadcrumbs"/>
    </div>
  )
}
