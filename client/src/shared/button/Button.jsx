import { btnStatus } from "../../constant";
import { Spinner } from "../../icons";

export const Button = ({
  children,
  status = "",
  onClick,
  className = "",
  ...props
}) => {
  const isDisabled =
    status === btnStatus.DISABLED || status === btnStatus.LOADING;

  return (
    <button
      className={`app_btn ${status} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {status === btnStatus.LOADING ? (
        <>
          Please wait... <Spinner />
        </>
      ) : (
        children
      )}
    </button>
  );
};
