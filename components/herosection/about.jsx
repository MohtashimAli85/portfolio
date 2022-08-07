import React from "react";

function About({ description }) {
  return (
    <div>
      <h1 className="text-primary font-bold text-lg leading-[21.66px] mb-5">
        ABOUT
      </h1>
      <p className="text-lg lg:text-xl leading-[21.66px] dark:text-white ">
        {description}
      </p>
    </div>
  );
}

export default About;
