import { useReducer } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Botton } from "../../shared/button/Botton";
import { Input } from "../../shared/input/Input";

// initial states
const initialState = {
  email: "",
};

// reducer
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    // TODO: Call your authentication logic here (API request, etc.)
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
          <div>
            <Input
              type="email"
              value={state.email}
              placeholder="Email Address"
              onChange={(e) =>
                dispatch({
                  type: types.SETEMAIL,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Botton>Submit</Botton>
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
