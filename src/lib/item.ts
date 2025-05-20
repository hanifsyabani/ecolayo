import { BoxIcon, HeadphonesIcon, ShoppingBag, Truck } from "lucide-react";
import {
  FaBox,
  FaCartArrowDown,
  FaHeart,
  FaHistory,
  FaImage,
  FaList,
  FaUser,
} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

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

export const dashboardUserItem = [
  {
    title: "Dashboard",
    link: "/shop/dashboard",
    icon: MdDashboard,
  },
  {
    title: "Order History",
    link: "/shop/dashboard/orders",
    icon: FaHistory,
  },
  {
    title: "Setting",
    link: "/shop/dashboard/settings",
    icon: IoIosSettings,
  },
];

export const ourTeam = [
  {
    name: "Hanif",
    position: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Maulana",
    position: "Head of Farmer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Salman",
    position: "IT Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];

export const statusOrder = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Placed",
    value: "placed",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "On the way",
    value: "on-the-way",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];
