"use client";
import React from "react";
import Item from "./Item";

const ContactMe = () => {
  return (
    <div className="hidden lg:block text-secondary-dark shrink-0 [&>li]:w-full [&>li]:block [&>li>a]:block [&>li]:border-r-0!  [&>li>a]:py-[14px]  whitespace-nowrap">
      <Item href="/contact-me" />
    </div>
  );
};

export default ContactMe;
