import Image from "next/image";
import type { ProfileCardProps } from "./types.td";

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="rounded-full"
        alt="profile Image"
        src={props.image || ""}
        height={50}
        width={50}
      />
      <div className="font-bold text-gray-100 text-md">{props.username}</div>
    </div>
  );
}

export default ProfileCard;
