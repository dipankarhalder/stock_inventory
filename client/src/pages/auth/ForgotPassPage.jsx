import { useReducer } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Button } from "../../shared/button/Button";
import { FormInput } from "../../components/auth/FormInput";

const initialState = {
  email: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case types.SETEMAIL:
      return { ...state, email: action.payload };
    case types.RESET:
      return { email: "" };
    default:
      return state;
  }
};

export const ForgotPassPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formFields = [
    {
      type: "email",
      value: state.email,
      placeholder: "Email address",
      dispatchType: types.SETEMAIL,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    dispatch({ type: types.RESET });
  };

  return (
    <div className="app_auth_form">
      <h1>Forgot password</h1>
      <p>
        No worries! enter your email address below, <br />
        and we'll send you a link to forgot your password.
      </p>
      <div className="app_form_auth">
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <FormInput key={index} {...field} dispatch={dispatch} />
          ))}
          <div>
            <Button>Submit</Button>
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
