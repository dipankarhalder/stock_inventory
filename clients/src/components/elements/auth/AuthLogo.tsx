import logo from "../../../assets/logo.png";

export const AuthLogo = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <span className="flex justify-center items-center w-[120px] h-[120px]">
        <img src={logo} alt="Drishtikon" />
      </span>
    </div>
  );
};
