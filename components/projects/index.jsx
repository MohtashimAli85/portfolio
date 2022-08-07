import React from "react";
import Heading from "../ui/heading";
import Card from "../ui/card";
function Projects() {
  const projects = [
    {
      title: "Stocks Telegraph",
      img: "/project-cover.png",
      href: "https://www.stockstelegraph.com",
      description: `Stocks Telegraph provides investors 
      and key Wall Street players with high-quality content and tools. Built on NextJS with TailwindCss`,
    },
  ];
  return (
    <div
      id="projects"
      className="mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2 mb-[84px]"
    >
      <Heading title="Projects" style="mt-[24px] mb-[77px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-16 p-8">
        {projects.map((project, index) => {
          return (
            <Card
              key={index}
              title={project.title}
              img={project.img}
              href={project.href}
              description={project.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
