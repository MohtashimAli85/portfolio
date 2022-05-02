import React from "react";
import Heading from "../ui/heading";
import Card from "../ui/card";
function Projects() {
  return (
    <div
      id="projects"
      className="mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2 mb-[84px]"
    >
      <Heading title="Projects" style="mt-[24px] mb-[77px]" />
      <div className="grid grid-cols-2 gap-x-20 gap-y-16 p-8">
        <Card
          title="Byte"
          img="/project-cover.png"
          href="#"
          type="Ecommerce Website"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus "
        />
        <Card
          title="Byte"
          img="/project-cover.png"
          href="#"
          type="Ecommerce Website"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus "
        />
        <Card
          title="Byte"
          img="/project-cover.png"
          href="#"
          type="Ecommerce Website"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus "
        />
        <Card
          title="Byte"
          img="/project-cover.png"
          href="#"
          type="Ecommerce Website"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus "
        />
      </div>
    </div>
  );
}

export default Projects;
