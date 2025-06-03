import Footer from "@/components/user/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavUser from "@/components/user/nav-user";
import { SidebarCart } from "@/components/user/sidebar-cart";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider admin={false}>
      <div className="w-full flex flex-col">
        <NavUser />
        <main className="pt-32 flex-grow">{children}</main>
        <Footer />
      </div>
      <SidebarCart />
    </SidebarProvider>
  );
}
