import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <ol className="flex h-[70dvh] items-center justify-center gap-10">
      <li className="flex h-full basis-1/4 items-center justify-center rounded border transition-transform duration-150 hover:scale-[1.02]">
        <Link href={"analytics/loyalties"}>
          <Image
            className="flex object-contain"
            width={450}
            src="/Loyalty.JPG"
            height={900}
            alt={"Revenue"}
          />
        </Link>
      </li>
      <li className="flex h-full basis-1/4 items-center justify-center rounded border transition-transform duration-150 hover:scale-[1.02]">
        <Link href={"analytics/map"}>
          <Image
            className="flex object-contain"
            width={450}
            src="/Map.JPG"
            height={900}
            alt={"Revenue"}
          />
        </Link>
      </li>
      <li className="flex h-full basis-1/4 items-center justify-center rounded border transition-transform duration-150 hover:scale-[1.02]">
        <Link href={"analytics/revenue"}>
          <Image
            className="flex object-contain"
            width={450}
            src="/Revenue.JPG"
            height={900}
            alt={"Revenue"}
          />
        </Link>
      </li>
    </ol>
  );
};

export default page;
