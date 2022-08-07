import React from "react";

function Lang({ langs }) {
  return (
    <div className="sm:text-right self-end min-h-[153px]">
      {" "}
      <h1 className="text-primary font-bold text-lg xl:text-xl leading-[21.66px] mb-5">
        LANGUAGEs
      </h1>
      <ul className="text-lg xl:text-xl leading-[24.63px] dark:text-white space-y-1">
        {langs &&
          langs.map((e, i) => {
            return <li key={`${e}${i}`}>{e}</li>;
          })}
      </ul>
    </div>
  );
}

export default Lang;
