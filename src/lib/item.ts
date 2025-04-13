import { BoxIcon, HeadphonesIcon, ShoppingBag, Truck } from "lucide-react";
import { FaBox, FaImage, FaList, FaUser } from "react-icons/fa";

export const shopServiceItem = [
  {
    title: "Free Shipping",
    icon: Truck,
    description: "Free shipping on all your order",
  },
  {
    title: "Customer Support 24/7",
    icon: HeadphonesIcon,
    description: "Intants access to Support",
  },
  {
    title: "100% Secure payment",
    icon: ShoppingBag,
    description: "We ensure your money is safe",
  },
  {
    title: "Money-Back Guarantee",
    icon: BoxIcon,
    description: "30 days Money-Back Guarantee",
  },
];

export const commonStats = [
  {
    title: "Total Users",
    key: "totalUsers",
    description: "Jumlah pengguna terdaftar",
    icon: FaUser,
    value: 0,
  },
  {
    title: "Total Banner",
    key: "totalStores",
    description: "Jumlah toko yang dibuat",
    icon: FaImage,
    value: 0,
  },
  {
    title: "Total Products",
    key: "totalProducts",
    description: "Jumlah produk yang tersedia",
    icon: FaBox,
    value: 0,
  },
  {
    title: "Total Categories",
    key: "totalCategories",
    description: "Jumlah kategori yang ada",
    icon: FaList,
    value: 0,
  },
];

export const footerLinks = [
  {
    title: "My Account",
    links: ["My Account", "Order History", "Shopping Cart", "Wishlist"],
  },
  {
    title: "Helps",
    links: ["Contact", "FAQs", "Terms & Condition", "Privacy Policy"],
  },
  {
    title: "Proxy",
    links: ["About", "Shop", "Product", "Track Order"],
  },
  {
    title: "Categories",
    links: [
      "Fruit & Vegetables",
      "Meat & Fish",
      "Bread & Bakery",
      "Beauty & Health",
    ],
  },
];

export const detailProfileUser = [
  {
    title: "Username",
    key: "username",
  },
  {
    title: "First Name",
    key: "firstName",
  },
  {
    title: "Last Name",
    key: "lastName",
  },
  {
    title: "Email Address",
    key: "email",
  },
  {
    title: "Mobile Number",
    key: "phone",
  },
  {
    title: "Last Login",
    key: "lastLogin",
  },
];
