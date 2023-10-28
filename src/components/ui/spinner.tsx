import { Loader } from "lucide-react";
import { type FunctionComponent } from "react";

export const SpinnerComponent: FunctionComponent = () => {
  return (
    <div className="grid w-full place-items-center">
      <Loader className="animate-spin" />
    </div>
  );
};
