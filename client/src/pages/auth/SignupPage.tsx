import { useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { signUpFormBuilderSchema } from "@/lib/formBuilder";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRules = {
  hasUppercase: (val: string) => /[A-Z]/.test(val),
  hasLowercase: (val: string) => /[a-z]/.test(val),
  hasSpecialChar: (val: string) => /[^A-Za-z0-9]/.test(val),
  hasMinLength: (val: string) => val.length >= 8,
};

export const SignupPage = () => {
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
    const { email, password } = formData;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
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
    toast.success("Signed in successfully", {
      description: new Date().toLocaleString(),
    });
    console.log("Form submitted:", formData);
  };

  const password = formData.password;

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="flex flex-col items-center justify-center">
          {signUpFormBuilderSchema.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <Input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
              />
              {field.name === "password" && (
                <div className="mt-2 text-xs space-y-1">
                  <p
                    className={clsx(
                      "transition",
                      passwordRules.hasUppercase(password)
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    • At least 1 uppercase letter
                  </p>
                  <p
                    className={clsx(
                      "transition",
                      passwordRules.hasLowercase(password)
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    • At least 1 lowercase letter
                  </p>
                  <p
                    className={clsx(
                      "transition",
                      passwordRules.hasSpecialChar(password)
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    • At least 1 special character
                  </p>
                  <p
                    className={clsx(
                      "transition",
                      passwordRules.hasMinLength(password)
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    • Minimum 8 characters
                  </p>
                </div>
              )}
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]}</p>
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
    </div>
  );
};
