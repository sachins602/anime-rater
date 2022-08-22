import { NextPage } from "next"
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";


const Dashboard: NextPage = () => {
    const { data } = useSession()
    const hello = trpc.useQuery(["auth.hello", { text: data?.user?.name }]);

    if (!hello.data) return <div>Unauthorized</div>

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800">
            <div className="">
                <div className="text-white">
                    {hello.data?.greeting}
                </div>
                <img className="" src={data?.user?.image?.toString()} />
                <div>
                </div>
                )
}

                export default Dashboard