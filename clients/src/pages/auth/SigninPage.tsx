import { SigninForm } from "@/components/elements/auth/SigninForm";
import { SigninLink } from "@/components/elements/auth/SigninLink";

export const SigninPage = () => {
  return (
    <div className="grid gap-6">
      <SigninForm />
      <SigninLink />
    </div>
  );
};
