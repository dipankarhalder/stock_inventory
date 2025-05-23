import { btnStatus } from "../../constant";
import { Spinner } from "../../icons";

export const Bottom = ({
  children,
  status = btnStatus.ACTIVE, // 'active' | 'disabled' | 'loading'
  onClick,
  className = "",
  ...props
}) => {
  const isDisabled =
    status === btnStatus.DISABLED || status === btnStatus.LOADING;

  return (
    <button
      className={`app_btn ${status} ${className}`}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      {...props}
    >
      {status === btnStatus.LOADING ? (
        <p>
          Please wait... <Spinner />
        </p>
      ) : (
        children
      )}
    </button>
  );
};
