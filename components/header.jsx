import React from "react";

function Header({ title, role, country }) {
  return (
    <div className="dark:text-white text-center mt-4 mb-20">
      <h1 className="text-[40px] leading-[48.13px]">{title}</h1>
      <h2 className="text-[40px] leading-[48.13px] my-[5px]">{role}</h2>
      <p className="text-2xl dark:text-white/90 leading-7">
        Based in {country}
      </p>
    </div>
  );
}

export default Header;
