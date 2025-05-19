import { useState, createContext } from "react";
import { Toast } from "../components/shared/toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [showToast] = useState(null); //setShowToast

  return (
    <ToastContext.Provider>
      {children} <Toast showToast={showToast} />
    </ToastContext.Provider>
  );
};
