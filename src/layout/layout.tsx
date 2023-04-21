import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className="w-[100%] flex flex-col justify-center items-center"
      role="main"
      aria-label="File Explorer main content"
    >
      <h1 className="md:mt-10 mt-5 md:mb-10 mb-5 md:text-[50px] text-[25px] font-medium md:font-bold">
        FILE EXPLORER
      </h1>
      <div
        className="md:w-[1200px] w-[300px] md:h-[650px] h-[550px] border bg-slate-200 shadow-lg rounded-md justify-center items-center md:p-10 p-5 overflow-scroll"
        role="region"
        aria-label="File Explorer file and folder list"
      >
        {children}
      </div>
    </div>
  );
}
