import { Music } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Breadcrumbs } from "./breadcrumbs";
import { Cart } from "./cart";
import { AuthButton } from "./signin-button";

export default async function Header() {
  const session = await getServerAuthSession();

  const userData = session
    ? await api.users.getForId.query({ id: session.user.id })
    : undefined;

  return (
    <header className="fixed left-14 top-0 z-50 flex h-[14dvh] w-[calc(100%-3.5rem)] justify-between bg-background px-7 pt-3">
      <div className="flex flex-col items-start justify-center gap-2">
        <Breadcrumbs />
        <div className="flex items-center gap-3">
          <Music className="stroke-[3] text-orange-500" />
          <h1 className="text-2xl font-semibold">drum-drum</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <AuthButton />
        {userData?.avatar && <Cart userData={userData} />}
      </div>
    </header>
  );
}
