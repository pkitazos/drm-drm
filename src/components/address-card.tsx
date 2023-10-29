import { type Address } from "@prisma/client";
import { MapPin } from "lucide-react";

export const AddressCard = ({
  address: { street_address, street_name, city, country, zip_code },
}: {
  address: Address;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-md bg-accent p-5 shadow-lg">
      <MapPin />
      <div className="flex flex-col">
        <p>
          <span>{street_address}</span>, <span>{street_name}</span>
        </p>
        <p>
          <span>{city}</span>, <span>{country}</span>
        </p>
        <p>{zip_code}</p>
      </div>
    </div>
  );
};
