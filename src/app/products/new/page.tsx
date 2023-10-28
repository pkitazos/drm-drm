import CreateProductForm from "./create-product-form";

export default function Page() {
  return (
    <main className="mt-[12dvh] flex flex-col items-center justify-center px-10">
      <div className="w-4/6">
        <div className="flex w-full justify-start">
          <h1 className="mb-8 text-4xl font-semibold">Create product</h1>
        </div>
        <CreateProductForm />
      </div>
    </main>
  );
}
