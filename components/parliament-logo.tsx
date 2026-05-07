import type React from "react";
import Image from "next/image";

interface ParliamentLogoProps {
  className?: string;
}

const ParliamentLogo: React.FC<ParliamentLogoProps> = ({ className }) => {
  return (
    <Image
      src="/images/logos/image.png"
      alt="Parliament Logo"
      width={96}
      height={40}
      className={className}
    />
  );
};

export default ParliamentLogo;
