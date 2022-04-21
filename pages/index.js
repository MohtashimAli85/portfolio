import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-center text-xl font-semibold text-red-500">
        Hello World
      </h1>
    </Layout>
  );
}
