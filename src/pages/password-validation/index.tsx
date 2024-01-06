import { z } from "zod";
import React from "react";
import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/utils/cn";
import { Code } from "@/components/ui/code";
import { Main } from "@/components/ui/main";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const atLeastOneLowerCaseLetter = z
  .string()
  .regex(/[a-z]/)
  .describe("At least one lowercase letter");
const atLeastOneUpperCaseLetter = z
  .string()
  .regex(/[A-Z]/)
  .describe("At least one uppercase leter");
const atLeastOneNumber = z
  .string()
  .regex(/[0-9]/)
  .describe("At least one number");
const atLeastOneSpecialCharacter = z
  .string()
  .regex(/[^a-zA-Z0-9]/)
  .describe("At least one special character");
const atLeastEightCharacters = z
  .string()
  .min(8)
  .describe("At least eight characters");
const maxNineteenCharacters = z.string().max(19).describe("Max 19 characters");

const validations = [
  atLeastOneLowerCaseLetter,
  atLeastOneUpperCaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  atLeastEightCharacters,
  maxNineteenCharacters,
];

const formSchema = z.object({
  password: z
    .string()
    .pipe(atLeastOneLowerCaseLetter)
    .pipe(atLeastOneUpperCaseLetter)
    .pipe(atLeastOneNumber)
    .pipe(atLeastOneSpecialCharacter)
    .pipe(atLeastEightCharacters)
    .pipe(maxNineteenCharacters),
});

type FormSchema = z.infer<typeof formSchema>;

const PasswordValidationPage: NextPage = () => {
  const toast = useToast();

  const form = useForm<FormSchema>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(data: FormSchema) {
    toast.toast({
      title: "Success",
      description: <Code object={data} />,
    });
  }

  return (
    <Main>
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          render={({ field }) => {
            return (
              <React.Fragment>
                <Label>
                  Password
                  <Input
                    type="password"
                    value={field.value}
                    {...form.register("password")}
                  />
                </Label>

                <div className="flex flex-col gap-1">
                  {validations.map((schema) => {
                    const isValid = schema.safeParse(field.value).success;

                    return (
                      <div
                        key={schema.description}
                        className={cn("flex items-center gap-1.5", {
                          "text-green-500": isValid,
                          "text-destructive": !isValid,
                        })}
                      >
                        {isValid ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <XIcon className="w-5 h-5" />
                        )}
                        {schema.description}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          }}
          name="password"
          control={form.control}
        />

        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </Form>
    </Main>
  );
};

export default PasswordValidationPage;
