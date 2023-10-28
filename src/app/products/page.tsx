import { api } from "~/trpc/server";
import { ClientSection } from "./client-section";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const data = await api.products.getAll.query({ page: 1 });
  return (
    <>
      <Button asChild>
        <Link href={"/products/new"}>
          <div>
            <Plus />
            New Product
          </div>
        </Link>
      </Button>
      <ClientSection productData={data} />;
    </>
  );
}
