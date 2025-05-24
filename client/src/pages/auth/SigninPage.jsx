import { useReducer } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { Botton } from "../../shared/button/Botton";
import { Input } from "../../shared/input/Input";

// action types
const actionTypes = {
  SETEMAIL: "SETEMAIL",
  SETPASSWORD: "SETPASSWORD",
  RESET: "RESET",
};

// initial states
const initialState = {
  email: "",
  password: "",
};

// reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SETEMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SETPASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.RESET:
      return { email: "", password: "" };
    default:
      return state;
  }
};

export const SigninPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    // TODO: Call your authentication logic here (API request, etc.)
    dispatch({ type: actionTypes.RESET });
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
          <div>
            <Input
              type="email"
              value={state.email}
              placeholder="Email Address"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SETEMAIL,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Input
              type="password"
              value={state.password}
              placeholder="Password"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SETPASSWORD,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="app_links_inside">
            <p>
              Are you &nbsp;
              <Link
                to={paths.forgot}
                className="font-medium underline hover:text-indigo-700"
              >
                forgot password?
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
