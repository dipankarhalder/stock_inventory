import { useReducer, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Button } from "../../shared/button/Button";
import { FormInput } from "../../components/auth/FormInput";
import { ToastContext } from "../../shared/toast/context/ToastContext";
import { validateLoginForm } from "../../utils/validationUtils";
import { toastStatus, btnStatus, userRole } from "../../constant";
import { postServices } from "../../services/core.services";
import { loginService } from "../../services/endpoints";
import { handleApiErrorToast } from "../../utils/handleApiErrorToast";
import { useAuthStore } from "../../stores/authStore";

const initialState = {
  email: "",
  password: "",
};

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
  const { addToast } = useContext(ToastContext);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { isLoading, setLoading, setToken, setRole } = useAuthStore();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateLoginForm(state);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await postServices(loginService, state);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) return;

      setRole(res.data.role);
      setToken(res.data.token);

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success!",
        description: res.data.message,
      });

      dispatch({ type: types.RESET });
      setErrors({});

      if (res.data.role === userRole.ADMIN) {
        navigate(paths.userDashboard);
      } else {
        navigate(paths.adminDashboard);
      }
    } finally {
      setLoading(false);
    }
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
            <Button status={isLoading && btnStatus.LOADING}>Login</Button>
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
