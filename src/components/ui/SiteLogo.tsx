'use client'

import { FC } from "react";
import { useRouter } from "next/navigation";

interface SiteLogoProps {
  width: string,
  extraClasses?: string
}

export const SiteLogo: FC<SiteLogoProps> = ({width, extraClasses}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return ( 
    <h1 
      onClick={handleClick}
      className={`py-2 font-black text-transparent bg-clip-text bg-linear-to-r from-[#006AFF] to-[#00F9FF] text-center cursor-pointer hover:scale-105 transition-all duration-300 ease-out ${extraClasses}`}
      style={{ fontSize: width}}
    >
      SkyConnect Explorer
    </h1>
  )
}