import React from "react";

const AuthBanner = () => {
  return (
    <div
      style={{ backgroundImage: "url(/images/login-bg.png)" }}
      className="h-screen sm:flex items-center justify-center flex-col hidden"
    >
      <img className="w-2/5 mb-7" src="/images/login-img.png" alt="login" />
      <h2 className="font-semibold text-2xl">Welcome To</h2>
      <h2 className="font-semibold text-2xl mb-4">MERN Training Portal</h2>
      <p className="w-2/3 text-center text-xs text-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat
        dolorem quisquam explicabo tempora accusantium ipsam deserunt nemo saepe
        quibusdam?
      </p>
    </div>
  );
};

export default AuthBanner;
