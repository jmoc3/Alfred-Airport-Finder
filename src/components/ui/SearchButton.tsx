import Image from "next/image"
import { FC } from "react"

interface SearchButtonProps {
  width: string,
  height?: string,
  extraClasses?: string
}

export const SearchButton : FC<SearchButtonProps> = ({ width, height, extraClasses }) => {
  return ( 
      <button className={`bg-linear-to-r from-[#0060FF] to-[#00FFE7] text-white w-full h-[52.6px] border border-white rounded-xl text-xl flex gap-5 items-center pl-8 cursor-pointer hover:shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300 ease-out ${extraClasses}`}
      style={{width, height}}>
            <Image src="/icons/SearchIcon.png" width={31.2} height={31.2} alt="" className="transition-transform duration-300 ease-out group-hover:rotate-12" />
            Buscar
          </button>
  )
}