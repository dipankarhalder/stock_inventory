import { Fragment, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Button } from "../../shared/button/Button";
import { FormInput } from "../../components/auth/FormInput";
import {
  passwordRules,
  getPasswordRuleText,
  validateRegisterForm,
} from "../../utils/validationUtils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case types.SETFIRSTNAME:
      return { ...state, firstName: action.payload };
    case types.SETLASTNAME:
      return { ...state, lastName: action.payload };
    case types.SETEMAIL:
      return { ...state, email: action.payload };
    case types.SETPHONE:
      return { ...state, phone: action.payload };
    case types.SETPASSWORD:
      return { ...state, password: action.payload };
    case types.RESET:
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      };
    default:
      return state;
  }
};

export const SignupPage = () => {
  const [errors, setErrors] = useState({});
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formFields = [
    {
      name: "firstName",
      type: "text",
      value: state.firstName,
      placeholder: "First name",
      dispatchType: types.SETFIRSTNAME,
    },
    {
      name: "lastName",
      type: "text",
      value: state.lastName,
      placeholder: "Last name",
      dispatchType: types.SETLASTNAME,
    },
    {
      name: "email",
      type: "email",
      value: state.email,
      placeholder: "Email address",
      dispatchType: types.SETEMAIL,
    },
    {
      name: "phone",
      type: "text",
      value: state.phone,
      placeholder: "Phone no.",
      dispatchType: types.SETPHONE,
    },
    {
      name: "password",
      type: "password",
      value: state.password,
      placeholder: "Password",
      dispatchType: types.SETPASSWORD,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateRegisterForm(state);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", state);
    dispatch({ type: types.RESET });
    setErrors({});
  };

  return (
    <div className="app_auth_form">
      <h1>Create an account</h1>
      <div className="app_form_auth">
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div className="app_wrap_field" key={index}>
              <FormInput
                {...field}
                dispatch={dispatch}
                error={errors[field.name]}
              />
              {errors[field.name] && (
                <p className="app_field_err">{errors[field.name]}</p>
              )}
              {field.name === "password" && (
                <div className="app_pass_rules">
                  {Object.entries(passwordRules).map(([key, ruleFn]) => (
                    <p
                      key={key}
                      className={` ${
                        ruleFn(state.password)
                          ? "app_valid_green"
                          : "app_valid_gray"
                      }`}
                    >
                      {getPasswordRuleText(key)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div>
            <Button>Register</Button>
          </div>
        </form>
        <div className="app_links">
          <p>
            If you have already account. &nbsp;
            <Link
              to={paths.login}
              className="font-medium underline hover:text-indigo-700"
            >
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
