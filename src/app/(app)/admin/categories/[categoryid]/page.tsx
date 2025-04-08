import FormEditCategory from "@/components/admin/categories/form-edit-category";
import { Card, CardContent } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: { categoryid: string };
}) {
  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormEditCategory id={params.categoryid} />
      </CardContent>
    </Card>
  );
}
