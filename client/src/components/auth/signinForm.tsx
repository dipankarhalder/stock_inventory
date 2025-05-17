"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signInFormBuilderSchema } from "@/lib/formBuilder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const validateEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex);
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

export const SigninForm = () => {
  const initialFormState = signInFormBuilderSchema.fields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {} as Record<string, string>
  );

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const { email, password } = formData;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("Signed in successfully", {
      description: new Date().toLocaleString(),
    });
    console.log("Submitted Information:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 w-full" noValidate>
      <div className="flex flex-col items-center justify-center w-full gap-6">
        {signInFormBuilderSchema.fields.map((field) => (
          <div key={field.name} className="flex flex-col w-full">
            <Label className="mb-1 text-xs text-slate-500">{field.label}</Label>
            <Input
              name={field.name}
              type={field.type}
              required={field.required}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p className="text-sm mt-[2px] font-medium text-red-500">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <Button
          type="submit"
          className={signInFormBuilderSchema.submitButton.className}
        >
          {signInFormBuilderSchema.submitButton.label}
        </Button>
      </div>
    </form>
  );
};
