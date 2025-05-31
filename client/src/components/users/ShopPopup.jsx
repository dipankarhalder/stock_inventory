import { useReducer } from "react";
import { types } from "../../constant/types";
import { Button } from "../../shared/button/Button";
import { FormInput } from "../../components/auth/FormInput";
import { usePopStore } from "../../stores/popStore";

const initialState = {
  createcompany: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case types.CREATECOMPANY:
      return { ...state, createcompany: action.payload };
    case types.RESET:
      return { createcompany: "" };
    default:
      return state;
  }
};

export const ShopPopup = () => {
  const { setPopClose } = usePopStore();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formFields = [
    {
      type: "text",
      value: state.createcompany,
      placeholder: "Company name",
      dispatchType: types.CREATECOMPANY,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);

    dispatch({ type: types.RESET });
  };

  return (
    <div className="app_shop_popup_cover">
      <span className="app_close_pop" onClick={() => setPopClose()}></span>
      <div className="app_main_shop_pop_cover">
        <form onSubmit={handleSubmit}>
          <div className="app_form_pop">
            <h2>Create your shop</h2>
            <p>Please fill the field and create a shop</p>
            <div className="app_pop_field">
              {formFields.map((field, index) => (
                <FormInput key={index} {...field} dispatch={dispatch} />
              ))}
            </div>
            <div className="app_btn_pop">
              <Button>Create</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
