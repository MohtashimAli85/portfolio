import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-rangoon-green">
      <div className=" text-primary text-lg leading-6 mx-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl sm:mx-auto py-14">
        <p>©2022 Mohtashim Ali</p>
        <div className="flex justify-between items-center mt-6">
          <p className="space-x-5 ">
            <span>Email me</span>
            <span>Connect on LinkedIn</span>
          </p>
          <ul className="flex gap-6">
            <li>
              <a
                href="https://www.linkedin.com/in/mohtashim-ali85?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0UBxIIhvSTmBE01WL8sf3Q%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.375 2.1875C4.375 3.39562 3.39562 4.375 2.1875 4.375C0.979377 4.375 0 3.39562 0 2.1875C0 0.979377 0.979377 0 2.1875 0C3.39562 0 4.375 0.979377 4.375 2.1875ZM0 6.25H4.4725V20H0V6.25ZM16.655 6.41125C16.6392 6.40625 16.6236 6.40111 16.6081 6.39597C16.577 6.3857 16.5458 6.37542 16.5125 6.36625C16.4525 6.3525 16.3925 6.34125 16.3312 6.33125C16.0938 6.28375 15.8337 6.25 15.5287 6.25C12.9212 6.25 11.2675 8.14625 10.7225 8.87875V6.25H6.25V20H10.7225V12.5C10.7225 12.5 14.1025 7.7925 15.5287 11.25V20H20V10.7212C20 8.64375 18.5763 6.9125 16.655 6.41125Z"
                    fill="#B0B8BC"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MohtashimAli85"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0C4.475 0 0 4.58819 0 10.2529C0 14.7899 2.8625 18.6219 6.8375 19.9804C7.3375 20.0701 7.525 19.7625 7.525 19.4934C7.525 19.2499 7.5125 18.4425 7.5125 17.5838C5 18.058 4.35 16.9558 4.15 16.3791C4.0375 16.0843 3.55 15.1743 3.125 14.9308C2.775 14.7386 2.275 14.2644 3.1125 14.2516C3.9 14.2388 4.4625 14.9949 4.65 15.3025C5.55 16.8533 6.9875 16.4175 7.5625 16.1484C7.65 15.4819 7.9125 15.0334 8.2 14.777C5.975 14.5207 3.65 13.6364 3.65 9.71466C3.65 8.59965 4.0375 7.67689 4.675 6.95918C4.575 6.70286 4.225 5.65193 4.775 4.24215C4.775 4.24215 5.6125 3.97301 7.525 5.29308C8.325 5.06239 9.175 4.94704 10.025 4.94704C10.875 4.94704 11.725 5.06239 12.525 5.29308C14.4375 3.9602 15.275 4.24215 15.275 4.24215C15.825 5.65193 15.475 6.70286 15.375 6.95918C16.0125 7.67689 16.4 8.58683 16.4 9.71466C16.4 13.6492 14.0625 14.5207 11.8375 14.777C12.2 15.0975 12.5125 15.7126 12.5125 16.6738C12.5125 18.0452 12.5 19.1474 12.5 19.4934C12.5 19.7625 12.6875 20.0829 13.1875 19.9804C15.1726 19.2932 16.8976 17.9851 18.1197 16.2401C19.3418 14.4951 19.9994 12.4012 20 10.2529C20 4.58819 15.525 0 10 0Z"
                    fill="#B0B8BC"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
