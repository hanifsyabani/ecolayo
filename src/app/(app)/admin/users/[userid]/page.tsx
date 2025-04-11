import FormEditUser from "@/components/admin/users/form-edit-user";
import { Card, CardContent } from "@/components/ui/card";

export default function page({ params }: { params: { userid: string } }) {
  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormEditUser userId={params.userid} />
      </CardContent>
    </Card>
  );
}
