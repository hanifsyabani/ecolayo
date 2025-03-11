import HeadingBanner from "@/components/user/heading-banner";
import { Banner } from "@prisma/client";
import axios from "axios";

interface pageProps {
  banner: Banner[];
}
export default async function page({ banner }: pageProps) {
  return (
    <>
      <HeadingBanner />
    </>
  );
}
