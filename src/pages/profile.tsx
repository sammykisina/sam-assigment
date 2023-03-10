import { Title } from "@/components";
import Head from "next/head";
import React from "react";

const Profile = () => {
  return (
    <>
      <Head>
        <title>fb3 - profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col gap-6  rounded-[2rem] border py-4 px-8">
        <Title title="Your Profile" titleStyles="text-lg" />

        <section className="flex h-full items-center justify-center ">
          <p className="bg-orange px-4 py-2 text-white">Feature Coming Soon!</p>
        </section>
      </main>
    </>
  );
};

export default Profile;
