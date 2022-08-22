import { NextPage } from "next"
import { useSession } from "next-auth/react";
import Image from "next/image";


const Dashboard: NextPage = () => {
    const { data } = useSession()

    if (!data) return <div>Unauthorized</div>

    return (
        <div className="bg-gray-800 w-screen">
            <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
                <div className="absolute top-2 right-2 h-16 w-32">
                    {data ?
                        <div>
                            <Image className="" src={data?.user!.image!.toString()} height={50} width={50} />
                            <div className="font-bold text-gray-100 text-md">
                                {data?.user?.name}
                            </div>
                        </div>

                        :
                        <div>Loading...</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard