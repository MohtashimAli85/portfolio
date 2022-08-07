import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";
import HeroSection from "../components/herosection/herosection";
import Projects from "../components/projects";
// import styles from "../styles/Home.module.css";

export default function Home() {
  const [height, setHeight] = useState("full-height lg:mt-0 lg:gap-0");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const height = screen.height;
      console.log(height);
      if (height <= 1080) {
        setHeight("full-height lg:mt-0 lg:gap-0");
      } else {
        setHeight("");
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
      </Head>
      <header
        className={`h-[100%] ${height} flex justify-between flex-col gap-10 mt-20 `}
      >
        <Header
          title="Mohtashim Ali"
          role="Frontend Developer"
          country="Pakistan"
        />
        <HeroSection />
      </header>
      <main>
        <Projects />
      </main>
    </Layout>
  );
}
