import React from "react";
import {
  MultiStepFormSchema,
  StepTwoSchema,
  Steps,
  stepTwoSchema,
} from "../(page-lib)/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

type Props = {
  formValues: MultiStepFormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<MultiStepFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

const StepTwo: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const form = useForm<StepTwoSchema>({
    defaultValues: {
      email: formValues.stepTwo.email,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepTwoSchema),
  });

  function handleSubmit(data: StepTwoSchema): void {
    setFormValues({
      ...formValues,
      stepTwo: {
        email: data.email,
      },
    });
    setStep(3);
  }

  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        Email
        <Input
          required
          placeholder="example@outlook.com"
          {...form.register("email")}
        />
        <FieldError message={form.formState.errors.email?.message} />
      </Label>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={() => setStep(1)}>
          Prev
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </Form>
  );
};

export default StepTwo;
