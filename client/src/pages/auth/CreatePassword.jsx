import { useReducer } from "react";
import { Botton } from "../../shared/button/Botton";
import { Input } from "../../shared/input/Input";

// action types
const actionTypes = {
  SETNEWPASSWORD: "SETNEWPASSWORD",
  SETREPEATPASSWORD: "SETREPEATPASSWORD",
  RESET: "RESET",
};

// initial states
const initialState = {
  newpassword: "",
  repeatpassword: "",
};

// reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SETNEWPASSWORD:
      return { ...state, newpassword: action.payload };
    case actionTypes.SETREPEATPASSWORD:
      return { ...state, repeatpassword: action.payload };
    case actionTypes.RESET:
      return { newpassword: "", repeatpassword: "" };
    default:
      return state;
  }
};

export const CreatePassword = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    // TODO: Call your authentication logic here (API request, etc.)
    dispatch({ type: actionTypes.RESET });
  };

  return (
    <div className="app_auth_form">
      <h1>Create a new password</h1>
      <p>
        Enter your new password below to complete the reset
        <br />
        process. Ensure it's strong and secure
      </p>
      <div className="app_form_auth">
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="password"
              value={state.newpassword}
              placeholder="New Password"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SETNEWPASSWORD,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Input
              type="password"
              value={state.repeatpassword}
              placeholder="Repeat New Password"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SETREPEATPASSWORD,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Botton>Submit</Botton>
          </div>
        </form>
      </div>
    </div>
  );
};
