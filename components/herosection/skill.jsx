import React from "react";

function Skill({ skills }) {
  return (
    <div className="sm:text-right">
      <h1 className="text-primary font-bold text-lg xl:text-xl leading-[21.66px] mb-5">
        SKILLS
      </h1>
      <ul className="text-lg xl:text-xl  leading-[21.66px] dark:text-white space-y-[3px]">
        {skills &&
          skills.map((e, i) => {
            return <li key={`${e}${i}`}>{e}</li>;
          })}
      </ul>
    </div>
  );
}

export default Skill;
