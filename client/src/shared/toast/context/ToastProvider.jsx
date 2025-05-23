import { useReducer, useCallback } from "react";
import { ToastContext } from "./ToastContext";
import { Toast } from "../Toast";

// action types
const actionTypes = {
  SHOWTOAST: "SHOWTOAST",
  HIDETOAST: "HIDETOAST",
};

// initial states
const initialToastState = {
  show: false,
  type: "",
  heading: "",
  description: "",
};

// reducer
function toastReducer(state, action) {
  switch (action.type) {
    case actionTypes.SHOWTOAST:
      return { show: true, ...action.payload };
    case actionTypes.HIDETOAST:
      return { ...state, show: false };
    default:
      return state;
  }
}

// provider
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  const addToast = useCallback((message, duration = 3000) => {
    if (!message.type) {
      return false;
    }

    dispatch({
      type: actionTypes.SHOWTOAST,
      payload: {
        type: message.type,
        heading: message.title,
        description: message.description,
      },
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.HIDETOAST });
    }, duration);
  }, []);

  const removeToast = () => {
    dispatch({ type: actionTypes.HIDETOAST });
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {state.show && (
        <Toast show={state.show} removeToast={removeToast} toastData={state} />
      )}
    </ToastContext.Provider>
  );
};
