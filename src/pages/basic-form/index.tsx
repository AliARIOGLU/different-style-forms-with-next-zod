"use client";

import React, { useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { FieldError } from "@/components/ui/field-error";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Main } from "@/components/ui/main";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";

import { FormSchema, formSchema } from "@/types/basic-form";

const BasicFormPage: NextPage = () => {
  const toast = useToast();
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const handlePasswordType = (e: React.MouseEvent) => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormSchema>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <Main>
      <Form
        onSubmit={handleSubmit((data) => {
          toast.toast({
            title: "Success",
            description: <Code object={data} />,
          });
        })}
      >
        <Label>
          Username
          <Input required placeholder="Username" {...register("username")} />
          <FieldError message={errors.username?.message} />
        </Label>

        <Label className="relative">
          Password
          {inputType === "password" ? (
            <Eye
              onClick={handlePasswordType}
              className="absolute top-7 right-4 cursor-pointer"
            />
          ) : (
            <EyeOffIcon
              onClick={handlePasswordType}
              className="absolute top-7 right-4 cursor-pointer"
            />
          )}
          <Input
            required
            placeholder="********"
            type={inputType === "password" ? "password" : "text"}
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </Label>
        <Label>
          Email
          <Input
            required
            placeholder="example@outlook.com"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </Label>

        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      </Form>
    </Main>
  );
};

export default BasicFormPage;
