import ProfileUser from "@/components/admin/users/profile";
import { Card, CardContent } from "@/components/ui/card";

export default function page({ params }: { params: { userid: string } }) {
  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-secondary rounded-xl py-4 h-32"/>
      <CardContent className="bg-white rounded-b-xl py-4">
        <ProfileUser id={params.userid}/>
      </CardContent>
    </Card>
  );
}
