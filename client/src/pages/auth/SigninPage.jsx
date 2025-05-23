import { useContext } from "react";
import { toastStatus } from ".././../constant";
import { ToastContext } from "../../shared/toast/context/ToastContext";

export const SigninPage = () => {
  const { addToast } = useContext(ToastContext);

  const toastMsg = {
    type: toastStatus.SUCCESS,
    title: "Toast form sign-in page",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  };

  return (
    <div>
      <h1>Home Page</h1>
      <span onClick={() => addToast(toastMsg, 3000)}>click me</span>
    </div>
  );
};
