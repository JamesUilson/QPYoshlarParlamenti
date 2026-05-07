import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PartyProps {
  party: {
    link: string;
    image: string;
    name: string;
  };
}

const Party: React.FC<PartyProps> = ({ party }) => {
  return (
    <Link
      href={party.link}
      className="bg-white rounded-lg shadow-sm flex flex-col gap-5 lg:w-64 w-full p-5 justify-center items-center"
    >
      <div>
        <Image
          src={party.image}
          alt={party.name}
          width={100}
          height={100}
          objectFit="contain"
        />
      </div>
      <p className="text-center text-sm">{party.name}</p>
    </Link>
  );
};

export default Party;
