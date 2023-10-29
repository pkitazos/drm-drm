"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = () => {
  const session = useSession();
  const { data } = api.users.getIcon.useQuery({
    id: session.data?.user.id ?? "",
  });
  if (data) {
    return (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={data?.UserLinking[0]?.customer.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-20"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-20"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};
