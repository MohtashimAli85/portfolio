import React from "react";

function Lang({ langs }) {
  return (
    <div className="text-right">
      {" "}
      <h1 className="text-aqua font-bold text-lg leading-[21.66px] mb-5">
        LANGUAGEs
      </h1>
      <p className="text-lg leading-[24.63px] dark:text-white ">
        {langs &&
          langs.map((e, i) => {
            return (
              <>
                <span key={`${e}${i}`}>{e}</span> <br></br>
              </>
            );
          })}
      </p>
    </div>
  );
}

export default Lang;
