import React from "react";

function Heading({ title, style }) {
  return (
    <h1
      className={`dark:text-white text-center text-[40px] leading-[48.13px] ${style}`}
    >
      {title}
    </h1>
  );
}

export default Heading;
