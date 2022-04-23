import React from "react";
import About from "./about";
import Skill from "./skill";
import Contact from "./contact";
import Lang from "./lang";
import Image from "next/image";
function HeroSection() {
  return (
    <div className="grid grid-cols-[minmax(285px,_1fr)_minmax(480px,_1fr)_minmax(285px,_1fr)] gap-x-8 grid-rows-2 mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2">
      <About description="I am an ever-learning Software Engineer Student. I specialize in developing static and dynamic websites having responsive frontend design.Currently learning React JS library." />
      <div className="row-span-2 w-full">
        <Image src="/Center.svg" alt="hero image" width={480} height={592} />
      </div>
      <Skill
        skills={[
          "HTML",
          "CSS",
          "SCSS",
          "Next JS",
          "React JS",
          "JavaScript",
          "Bootstrap",
          "Tailwind CSS",
          "Problem Solving",
        ]}
      />

      <Contact
        contacts={[
          {
            icon: "phone",
            contact: "+92 347 4692536",
            href: "tel:+923474692536",
          },
          {
            icon: "mail",
            contact: "mohtashima85@gmail.com",
            href: "mailto:mohtashima85@gmail.com",
          },
          {
            icon: "linkedin",
            contact: "linkedin.com/in/mohtashim-ali85",
            href: "linkedin.com/in/mohtashim-ali85",
          },
        ]}
      />
      <Lang langs={["English", "Urdu"]} />
    </div>
  );
}

export default HeroSection;
