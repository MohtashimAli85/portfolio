import React from "react";

function Skill({ skills }) {
  return (
    <div className="text-right">
      <h1 className="text-aqua font-bold text-lg leading-[21.66px] mb-5">
        SKILLS
      </h1>
      <p className="text-lg  leading-[21.66px] dark:text-white">
        {skills &&
          skills.map((e, i) => {
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

export default Skill;
