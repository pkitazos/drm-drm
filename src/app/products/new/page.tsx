import Image from "next/image";

export default function Page() {
  return (
    <main className="flex justify-center gap-5 h-[90dvh] p-5">
      <div className="flex items-center justify-center basis-1/3 border rounded">
        <Image src="/test-guitar.jpg" height={600} width={280} alt="test guitar" />
      </div>
      <div className="bg-green-100 basis-2/3">
        Test form
      </div>
    </main>
  );
}
