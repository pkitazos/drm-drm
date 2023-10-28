import Image from "next/image";
import Upload from "~/components/upload";

export default function Page() {
  return (
    <main className="flex h-[90dvh] justify-center gap-5 p-5">
      <button className="flex basis-1/3 items-center justify-center rounded border">
        <Image
          src="/test-guitar.jpg"
          height={600}
          width={280}
          alt="test guitar"
        />
      </button>
      <div className="basis-2/3 bg-green-100">
        <Upload />
      </div>
    </main>
  );
}
