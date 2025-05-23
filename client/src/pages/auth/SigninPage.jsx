import { useContext, useState } from "react";
import { Bottom } from "../../shared/button/Bottom";
import { toastStatus, btnStatus } from ".././../constant";
import { ToastContext } from "../../shared/toast/context/ToastContext";

export const SigninPage = () => {
  const { addToast } = useContext(ToastContext);
  const [status, setStatus] = useState(btnStatus.ACTIVE);

  const handleClick = () => {
    setStatus(btnStatus.LOADING);
    setTimeout(() => setStatus(btnStatus.ACTIVE), 2000);
  };

  const toastMsg = {
    type: toastStatus.SUCCESS,
    title: "Toast form sign-in page",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Bottom status={status} onClick={handleClick}>
        Submit
      </Bottom>
      <span onClick={() => addToast(toastMsg, 3000)}>click me</span>
    </div>
  );
};
