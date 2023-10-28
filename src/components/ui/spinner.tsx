import { Loader } from "lucide-react";
import { FunctionComponent } from "react";

export const SpinnerComponent: FunctionComponent = () => {
  return (
    <div className="grid place-items-center w-full">
      <Loader className="animate-spin" />
    </div>
  );
};
