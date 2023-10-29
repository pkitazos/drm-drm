import { Unauthorised } from "~/components/unauthorised";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    return <Unauthorised message="You need to sign in to access this page" />;
  }

  const { id } = session.user;
  const { role } = await api.users.getRole.query({ id });

  if (role !== "Admin") {
    return (
      <Unauthorised message="You need to be an admin to access this page" />
    );
  }

  return <>{children}</>;
}
