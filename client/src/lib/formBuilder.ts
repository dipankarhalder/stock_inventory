export const signInFormBuilderSchema = {
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      defaultValue: "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      defaultValue: "",
    },
  ],
  submitButton: {
    label: "Login",
    className: "theme-btn w-full",
  },
};


export const signUpFormBuilderSchema = {
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
      defaultValue: "",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      required: true,
      defaultValue: "",
    },
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
    label: "Registration",
    className: "theme-btn w-full",
  },
};