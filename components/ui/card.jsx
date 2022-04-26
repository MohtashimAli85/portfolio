import React from "react";
import Image from "next/image";
import Link from "next/link";
function Card({ img }) {
  return (
    <div className="pb-6 border-b border-b-white">
      <h1 className="text-sm tracking-[2px] leading-[18px]">WEBSITE DESIGN</h1>
      <Image src={img} width={508} height={401} alt={title} className="my-6" />
      <div>
        <h2 className="font-extrabold">
          <span className="text-primary">{title}</span> <span>{type}</span>
        </h2>
        <Link href={href}>
          <a>Visit</a>
        </Link>
      </div>
      <p className="text-white/80 mt-4">{description}</p>
    </div>
  );
}

export default Card;
