"use client";
import React from "react";
import Item from "./nav-item";

const ContactMe = () => {
  return (
    <Item
      className="hidden lg:block"
      route={{
        href: "/contact-me",
        name: "_contact-me",
      }}
    />
  );
};

export default ContactMe;
