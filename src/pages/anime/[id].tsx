import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

const AnimePage: NextPage = () => {
  const router = useRouter();
  const animeId = router.query.id;
  const animeData = trpc.useQuery([
    "example.getAnimeById",
    { id: animeId?.toString() },
  ]);
  return (
    <div>
      <div>id: {animeId}</div>
      <div>{animeData.data?.age_rating}</div>
      <div>{animeData.data?.age_rating_guide}</div>
      <div>{animeData.data?.title_en_jp}</div>
      <div>{animeData.data?.description}</div>
      <div>{animeData.data?.poster_image}</div>
      <div>{animeData.data?.subtype}</div>
      <Image
        height={300}
        width={240}
        src={animeData.data?.poster_image || ""}
        alt={animeData.data?.poster_image}
        className="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    </div>
  );
};

export default AnimePage;
