"use client";
import { type Customer } from "@prisma/client";
import Image from "next/image";
import { Loyalty } from "./loyalty";
import { TipLink } from "./tip-link";
import { Fragment } from "react";

export const CustomerCard = ({
  customer,
  withLink = false,
}: {
  customer: Customer;
  withLink?: boolean;
}) => {
  const Component = withLink ? TipLink : Fragment;

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={customer.avatar}
        width={300}
        height={300}
        alt="user Avatar"
        className="rounded-full border shadow-md"
      />
      <Component
        href={`/customers/${customer.Id}`}
        tip={<p>Customer Details</p>}
      >
        <h1 className="mt-2 text-center text-2xl font-bold">
          {customer.first_name} {customer.last_name}
        </h1>
      </Component>
      <Loyalty level={customer.LoyaltyLevel} />
    </div>
  );
};
