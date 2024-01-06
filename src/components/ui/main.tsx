import React from "react";
import { cn } from "@/utils/cn";

export const Main: React.FC<React.ComponentPropsWithoutRef<"main">> = ({
  className,
  ...rest
}) => {
  return (
    <main
      className={cn(
        "mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 bg-background",
        className
      )}
      {...rest}
    />
  );
};
