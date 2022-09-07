import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const { data } = useSession();
  const animeData = trpc.useQuery(["auth.getMany"]);

  if (!data) return <div>Unauthorized</div>;
  console.log(animeData);

  return (
    <div className="bg-gray-800 w-screen">
      <div className="container mx-auto flex flex-row items-center justify-center min-h-screen p-4">
        <div className="absolute top-2 right-2 h-16 w-32">
          {data ? (
            <div>
              <Image
                className=""
                alt="profile Image"
                src={data?.user?.image || ""}
                height={50}
                width={50}
              />
              <div className="font-bold text-gray-100 text-md">
                {data?.user?.name}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-white">
            {animeData?.data?.map((product) => (
              <Link
                key={product.id}
                href={`/anime/${product.id}`}
                className="group"
              >
                <a>
                  <div className="object-fill">
                    <Image
                      height={300}
                      width={240}
                      src={product.poster_image}
                      alt={product.poster_image}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm">{product.title_en_jp}</h3>
                  <p className="mt-1 text-lg font-medium">{product.subtype}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
