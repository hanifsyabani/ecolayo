import FormEditBanner from "@/components/admin/banner/form-edit-banner";
import { Card, CardContent } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: { bannerid: string };
}) {
  return (
    <Card className="px-8 mt-6 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormEditBanner id={params.bannerid} />
      </CardContent>
    </Card>
  );
}
