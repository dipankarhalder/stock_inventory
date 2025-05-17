"useClient";

import React, { useState } from "react";
import { toast } from "sonner";
import { signUpFormBuilderSchema } from "@/lib/formBuilder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const passwordRules = {
  hasMinLength: (val: string) => val.length >= 8,
  hasUppercase: (val: string) =>
    val
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      ),
  hasLowercase: (val: string) =>
    val
      .split("")
      .some(
        (char) => char === char.toLowerCase() && char !== char.toUpperCase()
      ),
  hasNumber: (val: string) => val.split("").some((char) => /\d/.test(char)),
  hasSpecialChar: (val: string) =>
    val.split("").some((char) => "!@#$%^&*()_+[]{}|;:,.<>?/".includes(char)),
};

const validateEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex);
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

const validateName = (name: string) => {
  return name.length >= 2 && !/[^a-zA-Z ]/.test(name);
};

export const SignupForm = () => {
  const initialFormState = signUpFormBuilderSchema.fields.reduce(
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
    const { firstName, lastName, email, password } = formData;

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!validateName(firstName)) {
      newErrors.firstName =
        "First name must be at least 2 characters and contain only letters and spaces.";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!validateName(lastName)) {
      newErrors.lastName =
        "Last name must be at least 2 characters and contain only letters and spaces.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else {
      const allValid = Object.values(passwordRules).every((fn) => fn(password));
      if (!allValid) {
        newErrors.password = "Password does not meet complexity requirements.";
      }
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
    toast.success("User registered successfully", {
      description: new Date().toLocaleString(),
    });
    console.log("Submitted Information:", formData);
  };

  const password = formData.password;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 w-full" noValidate>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {signUpFormBuilderSchema.fields.map((field) => (
          <div key={field.name} className="flex flex-col w-full">
            <Label className="mb-1 text-xs text-slate-500">{field.label}</Label>
            <Input
              name={field.name}
              type={field.type}
              required={field.required}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {field.name === "password" && (
              <div className="my-2 text-xs space-y-[2px]">
                {Object.entries(passwordRules).map(([key, ruleFn]) => (
                  <p
                    key={key}
                    className={`transition text-xs font-medium ${
                      ruleFn(password) ? "text-green-700" : "text-gray-400"
                    }`}
                  >
                    {getPasswordRuleText(key)}
                  </p>
                ))}
              </div>
            )}
            {errors[field.name] && (
              <p className="text-sm mt-[2px] font-medium text-red-500">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <Button
          type="submit"
          className={signUpFormBuilderSchema.submitButton.className}
        >
          {signUpFormBuilderSchema.submitButton.label}
        </Button>
      </div>
    </form>
  );
};

const getPasswordRuleText = (ruleKey: string) => {
  switch (ruleKey) {
    case "hasUppercase":
      return "• At least 1 uppercase letter";
    case "hasLowercase":
      return "• At least 1 lowercase letter";
    case "hasSpecialChar":
      return "• At least 1 special character";
    case "hasNumber":
      return "• At least 1 number";
    case "hasMinLength":
      return "• Minimum 8 characters";
    default:
      return "";
  }
};
