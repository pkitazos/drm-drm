import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const TipLink = ({
  href,
  children,
  tip,
}: {
  href: string;
  children: ReactNode;
  tip: ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            asChild
            variant="ghost"
            className="underline decoration-dotted"
          >
            <Link href={href}>{children}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
