import React from "react";
import Image from "next/image";
function Contact({ contacts }) {
  return (
    <div>
      <h1 className="text-aqua font-bold text-lg leading-[21.66px] mb-5">
        CONTACT
      </h1>
      <ul className="flex flex-col gap-[10px]">
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
                />
                <a
                  href={e.href}
                  className="dark:text-white text-base leading-[19.25px]"
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
