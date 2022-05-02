import React from "react";
import About from "./about";
import Skill from "./skill";
import Contact from "./contact";
import Lang from "./lang";
import Image from "next/image";
import Link from "next/link";
import BottomBlob from "../blobs/bottomblob";

function HeroSection() {
  return (
    <div className="hero-section relative">
      <div className=" mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-2">
        <div className="grid grid-cols-[minmax(285px,_1fr)_minmax(480px,_1fr)_minmax(285px,_1fr)] gap-x-8 grid-rows-2 ">
          <About description="I am an ever-learning Software Engineer Student. I specialize in developing static and dynamic websites having responsive frontend design." />
          <div className="row-span-2 w-full">
            <Image
              src="/Center.svg"
              alt="hero image"
              width={480}
              height={590}
              priority
            />
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
                contact: "Linkdein: Mohtashim Ali",
                href: "https://www.linkedin.com/in/mohtashim-ali85?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0UBxIIhvSTmBE01WL8sf3Q%3D%3D",
              },
            ]}
          />
          <Lang langs={["English", "Urdu"]} />
          <div className="col-span-3 justify-self-center mt-3">
            <Link href="#projects">
              <a>
                <Image
                  src="/downward-arrow.svg"
                  width={50}
                  height={50}
                  alt="downward arrow icon"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-primary/20 h-1"></div>
        <BottomBlob />
      </div>
    </div>
  );
}

export default HeroSection;
