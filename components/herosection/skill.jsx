import React from "react";

function Skill({ skills }) {
  return (
    <div className="text-right">
      <h1 className="text-primary font-bold text-lg leading-[21.66px] mb-5">
        SKILLS
      </h1>
      <div className="text-lg  leading-[21.66px] dark:text-white">
        {skills &&
          skills.map((e, i) => {
            return <p key={`${e}${i}`}>{e}</p>;
          })}
      </div>
    </div>
  );
}

export default Skill;
