import { useState } from "react";
import { toast } from "sonner";
import { signInFormBuilderSchema } from "@/lib/formBuilder";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

export const SignupPage = () => {
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

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character.";
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

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="flex flex-col items-center justify-center">
          {signInFormBuilderSchema.fields.map((field) => (
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
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]}</p>
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
    </div>
  );
};
