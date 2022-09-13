import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import Button from "../../components/Button";

const AnimePage: NextPage = () => {
  const router = useRouter();
  const animeId = router.query.id;
  const animeData = trpc.useQuery([
    "example.getAnimeById",
    { id: animeId?.toString() },
  ]);
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
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <Button onClick={() => router.push("/dashboard")} name="Home" />
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            height={300}
            width={240}
            src={animeData.data?.poster_image || ""}
            alt={animeData.data?.poster_image}
            className="w-full h-full object-center object-cover group-hover:opacity-75"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {animeData.data?.title_en || animeData.data?.title_en_jp}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">
                  Popularity Rank : {animeData.data?.popularity_rank}
                </span>
              </span>
            </div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {animeData.data?.synopsis}
            </h2>
            <p className="leading-relaxed">{animeData.data?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex ml-6 items-center">
                <span className="mr-3">{animeData.data?.status}</span>
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Type : {animeData.data?.subtype}
              </span>
              <button
                onClick={() => {
                  handleLike(animeData.data?.id as string);
                }}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex 
              items-center justify-center text-red-600 ml-4"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimePage;
