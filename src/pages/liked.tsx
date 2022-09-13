import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../components/Button";
import ImageCard from "../components/ImageCard";
import { trpc } from "../utils/trpc";

const Liked: NextPage = () => {
  const likedAnimeData = trpc.useQuery(["auth.getLikedAnime"]);

  const { data } = useSession();
  if (!data) return <div>Unauthorized</div>;

  return (
    <div className="bg-gray-800 w-screen">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <Link href={"dashboard"}>
          <Button name="Home" />
        </Link>
        <div className="grid grid-cols-4 gap-4 p-10">
          {likedAnimeData?.data?.map((product) => (
            <ImageCard
              key={product.anime.id}
              id={product.anime.id}
              title={product.anime.title_en_jp}
              image={product.anime.poster_image}
              subtype={product.anime.subtype}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Liked;
