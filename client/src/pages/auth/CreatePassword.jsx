import { useReducer } from "react";
import { types } from "../../constant/types";
import { Button } from "../../shared/button/Button";
import { FormInput } from "../../components/auth/FormInput";

const initialState = {
  newpassword: "",
  repeatpassword: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case types.SETNEWPASSWORD:
      return { ...state, newpassword: action.payload };
    case types.SETREPEATPASSWORD:
      return { ...state, repeatpassword: action.payload };
    case types.RESET:
      return { newpassword: "", repeatpassword: "" };
    default:
      return state;
  }
};

export const CreatePassword = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formFields = [
    {
      type: "password",
      value: state.newpassword,
      placeholder: "New password",
      dispatchType: types.SETNEWPASSWORD,
    },
    {
      type: "password",
      value: state.repeatpassword,
      placeholder: "Repeat Password",
      dispatchType: types.SETREPEATPASSWORD,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    dispatch({ type: types.RESET });
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
          {formFields.map((field, index) => (
            <FormInput key={index} {...field} dispatch={dispatch} />
          ))}
          <div>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
