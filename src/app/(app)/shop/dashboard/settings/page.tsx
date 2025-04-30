import { Card, CardContent } from "@/components/ui/card";
import FormAccountSetting from "@/components/user/dashboard/settings/form-account-setting";
import FormBillingAddress from "@/components/user/dashboard/settings/form-billing-address";
import FormChangePassword from "@/components/user/dashboard/settings/form-change-password";

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
          <h1 className="font-semibold text-xl">Billing Address</h1>
          <FormBillingAddress />
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
