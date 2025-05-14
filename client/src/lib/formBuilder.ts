export const signInFormBuilderSchema = {
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      defaultValue: "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      defaultValue: "",
    },
  ],
  submitButton: {
    label: "Sign In",
    className: "theme-btn w-full",
  },
};
