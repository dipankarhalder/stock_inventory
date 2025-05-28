import { useReducer, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Botton } from "../../shared/button/Botton";
import { FormInput } from "../../components/auth/FormInput";
import { validateLoginForm } from "../../utils/validationUtils";

// initial states
const initialState = {
  email: "",
  password: "",
};

// reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case types.SETEMAIL:
      return { ...state, email: action.payload };
    case types.SETPASSWORD:
      return { ...state, password: action.payload };
    case types.RESET:
      return { email: "", password: "" };
    default:
      return state;
  }
};

export const SigninPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formFields = [
    {
      name: "email",
      type: "email",
      value: state.email,
      placeholder: "Email address",
      dispatchType: types.SETEMAIL,
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
    const newErrors = validateLoginForm(state);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (state.email === "dipankar@gmail.com" && state.password === "Dip@1234") {
      navigate(paths.adminDashboard);
    }

    dispatch({ type: types.RESET });
    setErrors({});
  };

  return (
    <div className="app_auth_form">
      <h1>Welcome back!</h1>
      <p>
        Sign in to access your dashboard, <br />
        settings and projects
      </p>
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
            </div>
          ))}
          <div className="app_links_inside">
            <p>
              <Link
                to={paths.forgot}
                className="font-medium underline hover:text-indigo-700"
              >
                Forgot password?
              </Link>
            </p>
          </div>
          <div>
            <Botton>Login</Botton>
          </div>
        </form>
        <div className="app_links">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link
              to={paths.register}
              className="font-medium underline hover:text-indigo-700"
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
