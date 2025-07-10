import { SignupForm } from "@/components/elements/auth/SignupForm";
import { SignupLink } from "@/components/elements/auth/SignupLink";

export const SignupPage = () => {
  return (
    <div className="grid gap-6">
      <SignupForm />
      <SignupLink />
    </div>
  );
};
