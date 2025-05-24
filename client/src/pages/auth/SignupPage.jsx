import { useReducer } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { types } from "../../constant/types";
import { Botton } from "../../shared/button/Botton";
import { Input } from "../../shared/input/Input";

// initial states
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case types.SETFIRSTNAME:
      return { ...state, firstName: action.payload };
    case types.SETLASTNAME:
      return { ...state, lastName: action.payload };
    case types.SETEMAIL:
      return { ...state, email: action.payload };
    case types.SETPASSWORD:
      return { ...state, password: action.payload };
    case types.RESET:
      return { firstName: "", lastName: "", email: "", password: "" };
    default:
      return state;
  }
};

export const SignupPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    // TODO: Call your authentication logic here (API request, etc.)
    dispatch({ type: types.RESET });
  };

  return (
    <div className="app_auth_form">
      <h1>Create an account</h1>
      <p>
        Let's get your profile set up in less than <br />2 minutes.
      </p>
      <div className="app_form_auth">
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              value={state.firstName}
              placeholder="First name"
              onChange={(e) =>
                dispatch({
                  type: types.SETFIRSTNAME,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Input
              type="text"
              value={state.lastName}
              placeholder="Last name"
              onChange={(e) =>
                dispatch({
                  type: types.SETLASTNAME,
                  payload: e.target.value,
                })
              }
            />
          </div>

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
          <div>
            <Botton>Register</Botton>
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
