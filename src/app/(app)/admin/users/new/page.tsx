import FormAddUser from "@/components/admin/users/form-add-user";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <Card className="px-3 py-8">
      <CardContent className="bg-white py-4 rounded-xl">
        <FormAddUser />
      </CardContent>
    </Card>
  );
}
