import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomeContents = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      router.push('/dashboard');
    }
  }, [data]);
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="text-2xl font-bold">Please log in below</div>
      <div className="p-4" />
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-2xl text-black" >
        <span>Sign in with Google</span>
        {/* <FaGoogle /> */}
      </button>
    </div>
  )

}

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800">
        <HomeContents />
      </main>

    </>
  );
};


export default Home;
