import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username="ali@test.com" />
      <Banner
        title="A Hero"
        subTitle="an Asghar Farhadi production"
        imgUrl="/static/a-hero.jpg"
      />
      {/* <Card /> */}
    </div>
  );
}
