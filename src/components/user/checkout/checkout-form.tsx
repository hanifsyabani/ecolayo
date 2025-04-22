
'use client'

import React from "react";
import BillingInfo from "./billing-info";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutForm() {
  return (
    <>
      <div className="flex px-8 gap-10">
        <div className="w-[70%]">
          <div>
            <h1 className="text-xl font-semibold mb-4">Billing Information</h1>
            <BillingInfo />
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-4">Additional Info</h1>
          </div>
        </div>
        <div className="w-[30%]">
          <Card>
            <CardContent className="bg-white">
              <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
