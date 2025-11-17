import { FC } from "react";

export const BackgroundLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative bg-[url('/images/heroImage.jpg')] dark:bg-[url('/images/heroImage.jpg')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="absolute inset-0 h-inherit bg-slate-900/80 dark:bg-black/90 transition-colors duration-300"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}