import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import ImageCard from "../components/ImageCard";
import ProfileCard from "../components/ProfileCard";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [animeStateData, setAnimeStateData] = React.useState<any[]>();
  const defaultAnimeData = trpc.useQuery(["auth.getDefaultAnime"]);
  const animeData = trpc.useMutation(["auth.getMany"]);

  const { data } = useSession();
  if (!data) return <div>Unauthorized</div>;

  const handleNext = () => {
    setPageNumber(pageNumber + 8);
    animeData.mutate({ page: pageNumber });
    setAnimeStateData(animeData.data);
  };
  const handlePrevious = () => {
    setPageNumber(pageNumber - 8);
    animeData.mutate({ page: pageNumber });
    setAnimeStateData(animeData.data);
  };

  return (
    <div className="bg-gray-800 w-screen">
      <div className="container mx-auto flex flex-row items-center justify-center min-h-screen p-4">
        <div className="absolute top-2 right-2 h-16 w-32">
          {data ? (
            <ProfileCard
              username={data?.user?.name}
              image={data?.user?.image}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-white">
            {pageNumber === 0 ? (
              <>
                {defaultAnimeData?.data?.map((product) => (
                  <ImageCard
                    key={product.id}
                    id={product.id}
                    title={product.title_en_jp}
                    image={product.poster_image}
                    subtype={product.subtype}
                  />
                ))}
              </>
            ) : (
              <>
                {animeStateData?.map((product) => (
                  <ImageCard
                    key={product.id}
                    id={product.id}
                    title={product.title_en_jp}
                    image={product.poster_image}
                    subtype={product.subtype}
                  />
                ))}
              </>
            )}
            <button onClick={handlePrevious}>previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
