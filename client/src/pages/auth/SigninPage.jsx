import { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Botton } from "../../shared/button/Botton";
import { Input } from "../../shared/input/Input";

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
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    if (state.email === "dipankar@gmail.com" && state.password === "Dip@1234") {
      navigate(paths.adminDashboard);
    }

    dispatch({ type: types.RESET });
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
                  type: types.SETEMAIL,
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
                  type: types.SETPASSWORD,
                  payload: e.target.value,
                })
              }
            />
          </div>
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
