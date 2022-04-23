import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";
import HeroSection from "../components/herosection/herosection";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
      </Head>
      <Header
        title="Mohtashim Ali"
        role="Frontend Developer"
        country="Pakistan"
      />
      <HeroSection />
    </Layout>
  );
}
