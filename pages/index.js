import Head from "next/head";
// import Image from "next/image";
import Hero from "@/components/homePageComponents/Hero";
import Story from "@/components/homePageComponents/Story";
import Results from "@/components/homePageComponents/Results";
import ExploreMore from "@/components/homePageComponents/ExploreMore";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Welcome to my personal site!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Story />
        <Results/>
        <ExploreMore/>
      </main>
    </>
  );
}
