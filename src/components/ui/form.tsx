import { cn } from "@/utils/cn";
import React from "react";

type FormProps = React.ComponentPropsWithRef<"form">;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...rest }, ref) => {
    return (
      <form
        ref={ref}
        {...rest}
        className={cn("flex flex-col gap-2 w-full", className)}
      />
    );
  }
);

Form.displayName = "Form";
