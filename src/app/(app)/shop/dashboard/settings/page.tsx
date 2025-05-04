import { Card, CardContent } from "@/components/ui/card";
import FormAccountSetting from "@/components/user/dashboard/settings/form-account-setting";
import FormChangePassword from "@/components/user/dashboard/settings/form-change-password";
import FormShippingAddress from "@/components/user/dashboard/settings/form-shipping-address";

export default function page() {
  return (
    <section className="space-y-4">
      <Card className="py-2">
        <CardContent>
          <h1 className="font-semibold text-xl">Account Settings</h1>
          <FormAccountSetting />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <h1 className="font-semibold text-xl">Shipping Address</h1>
          <FormShippingAddress/>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <h1 className="font-semibold text-xl">Change Password</h1>
          <FormChangePassword/>
        </CardContent>
      </Card>
    </section>
  );
}
