import Link from "next/link";
import type { ImageCardProps } from "./types";
import Image from "next/image";

export default function ImageCard(props: ImageCardProps) {
  return (
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
  );
}
