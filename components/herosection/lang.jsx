import React from "react";

function Lang({ langs }) {
  return (
    <div className="sm:text-right">
      {" "}
      <h1 className="text-primary font-bold text-lg leading-[21.66px] mb-5">
        LANGUAGEs
      </h1>
      <div className="text-lg leading-[24.63px] dark:text-white ">
        {langs &&
          langs.map((e, i) => {
            return <p key={`${e}${i}`}>{e}</p>;
          })}
      </div>
    </div>
  );
}

export default Lang;
