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
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().trim().min(3, "Too short").max(20, "Too long"),
  password: z
    .string()
    .min(8, "Too short")
    .regex(/[0-9]/, "Must contain a number"),
  email: z.string().email("Invalid email"),
});

type FormSchema = z.infer<typeof formSchema>;

const BasicFormPage: NextPage = () => {
  const toast = useToast();

  const form = useForm<FormSchema>({
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
        onSubmit={form.handleSubmit((data) => {
          toast.toast({
            title: "Success",
            description: <Code object={data} />,
          });
        })}
      >
        <Label>
          Username
          <Input
            required
            placeholder="Username"
            {...form.register("username")}
          />
          <FieldError message={form.formState.errors.username?.message} />
        </Label>

        <Label>
          Password
          <Input
            required
            placeholder="********"
            type="password"
            {...form.register("password")}
          />
          <FieldError message={form.formState.errors.password?.message} />
        </Label>

        <Label>
          Email
          <Input
            required
            placeholder="example@outlook.com"
            {...form.register("email")}
          />
          <FieldError message={form.formState.errors.email?.message} />
        </Label>

        <Button disabled={!form.formState.isValid} type="submit">
          Submit
        </Button>
      </Form>
    </Main>
  );
};

export default BasicFormPage;
