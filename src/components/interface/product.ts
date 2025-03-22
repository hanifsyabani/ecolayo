import { Category, Images, Product, Tag } from "@prisma/client";

export interface ProductProps {
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
        tag: Tag[];
        category: Category;
      })
    | null;
}