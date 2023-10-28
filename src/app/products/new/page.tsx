import CreateProductForm from "./form";

export default function Page() {
  return (
    <main className="flex h-[80dvh] justify-center gap-5 p-5">
      <CreateProductForm />

      {/* <div className="relative flex basis-1/3 flex-col items-center justify-center rounded border">
        <Image
          className="flex h-full object-contain"
          src="/test-guitar.jpg"
          height={600}
          width={280}
          alt="test guitar"
        />
        <Button
          variant="ghost"
          className="absolute bottom-0 right-0 h-max"
          size="icon"
        >
          <FileUploadButton />
        </Button>
      </div>
      <div className="basis-2/3 bg-green-100">
        <ProductForm />
      </div> */}
    </main>
  );
}
