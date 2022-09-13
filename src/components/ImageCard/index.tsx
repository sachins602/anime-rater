import Link from "next/link";
import type { ImageCardProps } from "./types";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { trpc } from "../../utils/trpc";

export default function ImageCard(props: ImageCardProps) {
  const likeData = trpc.useMutation(["auth.likeAnime"]);

  const handleLike = (choosenAnimeId: string) => {
    likeData
      .mutateAsync({
        animeId: choosenAnimeId,
      })
      .catch((err) => {
        window.alert("You already liked this anime");
      });
  };

  return (
    <div className="hover:opacity-70 hover:text-red-500 hover:scale-110">
      <Link key={props.id} href={`/anime/${props.id}`} className="group">
        <a>
          <div className="object-fill">
            <Image
              height={300}
              width={240}
              src={props.image || ""}
              alt={props.image}
              className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm">{props.title}</h3>
          <p className="mt-1 text-lg font-medium">{props.subtype}</p>
        </a>
      </Link>
      <button
        onClick={() => {
          handleLike(props.id);
        }}
        className="rounded-full w-7 h-7 bg-gray-200 p-0 border-0 inline-flex 
              items-center justify-center text-red-600 ml-48 hover:scale-125 hover:bg-green-400"
      >
        <FaHeart />
      </button>
    </div>
  );
}
