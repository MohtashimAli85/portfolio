import React from "react";
import Image from "next/image";
function TopBlob() {
  return (
    <div className={`absolute top-16 left-20`}>
      <Image
        src="/top-left-blob.svg"
        width={164}
        height={164}
        alt="blob icon"
      />
    </div>
  );
}

export default TopBlob;
