import React from "react";
import Image from "next/image";
function Contact({ contacts }) {
  return (
    <div className="self-end">
      <h1 className="text-primary font-bold text-lg lg:text-xl leading-[21.66px] mb-5">
        CONTACT
      </h1>
      <ul className="flex flex-col gap-[6px]">
        {contacts &&
          contacts.map((e, i) => {
            return (
              <li
                key={`${e.icon}${i}`}
                className="flex gap-[6px] p-[3px] items-center"
              >
                <Image
                  src={`/${e.icon}.svg`}
                  width="25"
                  height="25"
                  alt={`${e.icon} icon`}
                  priority
                />
                <a
                  href={e.href}
                  className="dark:text-white text-base leading-[19.25px] font-sans"
                >
                  {e.contact}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Contact;
