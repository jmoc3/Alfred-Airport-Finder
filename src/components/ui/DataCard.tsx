import { FC, ReactNode } from "react";
import Image from "next/image";

interface DataCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export const DataCard: FC<DataCardProps> = ({ title, icon = "/icons/Info Circle.png", children }) => {
  return (
    <div className="rounded-xl border border-white dark:border-gray-700 bg-linear-to-r from-[#3F495F] to-[#0E1934] dark:from-gray-800 dark:to-gray-950 overflow-hidden hover:shadow-xl hover:border-[#00FFE7]/50 dark:hover:border-blue-500/50 transition-all duration-300 ease-out">
      <div className="flex">
        <div className="w-[70%] p-12 grid gap-4">
          <div className="flex items-center gap-5 mb-6">
            <Image
              src={icon}
              alt={title}
              width={55}
              height={55}
              className="transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6"
            />
            <h2 className="text-2xl text-[40px] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#006AFF] to-[#00F9FF]">
              {title}
            </h2>
          </div>
          <div className="space-y-3 text-white dark:text-gray-200 text-[30px]">
            {children}
          </div>
        </div>

        <div className="relative w-[30%] overflow-hidden">
          <Image 
            src="/images/cardImage.jpg" 
            alt={title}
            fill
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0e1934e7] to-[#0E1934] dark:from-gray-900/95 dark:to-black/95 opacity-90"></div>
        </div>
      </div>
    </div>
  );
};
