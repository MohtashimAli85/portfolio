import React from "react";
import Image from "next/image";
import Link from "next/link";
function Card({ img, title, href, type, description }) {
  return (
    <div className="pb-6 border-b border-b-white max-w-[504px]">
      <h1 className="dark:text-white text-sm tracking-[2px] leading-[18px] font-extrabold mb-6">
        WEBSITE DESIGN
      </h1>
      <Image src={img} width={508} height={401} alt={title} />
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl leading-10">
          <span className="text-primary font-extrabold">{title}</span>{" "}
          <span className="dark:text-white">- {type}</span>
        </h2>
        <Link href={href}>
          <a className="bg-primary text-sm px-7 py-3 rounded">Visit</a>
        </Link>
      </div>
      <p className="text-white/80 mt-4">{description}</p>
    </div>
  );
}

export default Card;
