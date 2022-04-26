import React from "react";
import Image from "next/image";
function BottomBlob() {
  return (
    <div className="absolute right-0 bottom-5">
      <Image src="/mid-right-blob.svg" width={126} height={177} alt="blob" />
    </div>
  );
}

export default BottomBlob;
