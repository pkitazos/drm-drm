import { Loader } from "lucide-react";

export function SpinnerComponent() {
  return (
    <div className="grid w-full place-items-center">
      <Loader className="animate-spin" />
    </div>
  );
}
