import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className="w-[100%] h-[844px] md:h-[100vh] flex flex-col justify-center items-center opacity-100"
      role="main"
      aria-label="File Explorer main content"
    >
      <h1 className="md:mt-10 mt-5 md:mb-10 mb-5 md:text-5xl text-3xl font-bold text-black-500 text-shadow-md transform skew-x-12">
        FILE EXPLORER
      </h1>
      <div
        className="md:w-[1200px] w-[300px] md:h-[650px] h-[550px] border bg-stone-300 shadow-lg rounded-md justify-center items-center md:pb-10 pb-5 overflow-scroll"
        role="region"
        aria-label="File Explorer file and folder list"
      >
        {children}
      </div>
    </div>
  );
}
