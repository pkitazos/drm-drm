import { Unauthorised } from "~/components/unauthorised";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    return <Unauthorised message="You need to sign in to access this page" />;
  }

  const user = session.user;
  const { role } = await api.users.getRole.query({ id: user.id });

  if (role !== "Customer") {
    return (
      <Unauthorised message="You don't have an account page as an Admin" />
    );
  }

  return <>{children}</>;
}
