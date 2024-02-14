import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <div className="flex">
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <img
            src="/assets/Images/social-media-side-img-2.png"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat ml-20"
            alt="img" 
          />
          <section className="flex flex-1  justify-center flex-col items-center  py-10">
            <Outlet />
          </section>
        </>
      )}
    </div>
  );
};
export default AuthLayout;
