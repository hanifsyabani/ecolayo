"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
  idIndikator: string;
  nameIndikator: string;
}

export default function ApiList({ idIndikator, nameIndikator }: ApiListProps) {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeid}`;
  return (
    <div className="space-y-6">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${nameIndikator}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${nameIndikator}/{${idIndikator}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${nameIndikator}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${nameIndikator}/{${idIndikator}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${nameIndikator}/{${idIndikator}}`}
      />
    </div>
  );
}
