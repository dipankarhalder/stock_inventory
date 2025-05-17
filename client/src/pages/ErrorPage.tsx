import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="h-screen w-full flex justify-center items-center theme-gradient-bg">
      <div className="align-center">
        {isRouteErrorResponse(error) ? (
          <div className="flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl mb-6 font-bold">Hey there,</h1>
            <p className="text-md font-base text-2xl">
              I'm sorry to inform you that the link is not available which you
              are looking for.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl mb-6 font-bold">404</h1>
            <p className="text-md font-base text-2xl">
              Sorry, Something wants wrong.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
