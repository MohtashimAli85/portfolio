import React, { useEffect } from "react";
import TopBlob from "./blobs/topblob";
import Heading from "./ui/heading";
// import anime from 'animejs';
function Header({ title, role, country }) {
  //   useEffect(()=>{
  // const opacityKeyFrame = Array(10).fill().map((element, index) =>{ return({opacity: index/10})})
  // // console.log(object)
  //     anime({
  //       targets:'.title',
  //       opacity:1,
  //       translateY:0,
  //       // keyframes: opacityKeyFrame,
  //       duration: 400,
  //     delay: 1000,
  //     easing: 'easeInQuad'
  //     });

  //   },[])
  console.log("Header rendered");
  return (
    <>
      <div className="dark:text-white text-center mt-4 mb-16">
        <Heading title={title} />
        <Heading title={role} style="my-[5px]" />
        <p className="text-2xl dark:text-white/90 leading-7">
          Based in {country}
        </p>
      </div>
      <TopBlob />
    </>
  );
}

export default React.memo(Header);
