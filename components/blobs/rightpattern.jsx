import React from "react";
import Image from "next/image";
function TopRightPattern() {
  return (
    <div className="absolute right-0 top-0">
      <Image
        src="/top-right-pattern.svg"
        width={178}
        height={242}
        alt="pattern"
      />
    </div>
  );
}

export default TopRightPattern;
