"use client";
import React from "react";
import Item from "./nav-item";

const ContactMe = () => {
  return (
    <Item
      route={{
        href: "/contact-me",
        name: "_contact-me",
      }}
    />
  );
};

export default ContactMe;
