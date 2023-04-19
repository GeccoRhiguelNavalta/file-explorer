import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <h1 className="mt-10 mb-10 text-[50px] font-bold">FILE EXPLORER</h1>
      <div className="w-[1200px] h-[650px] border-gray-700 bg-slate-400 shadow-lg rounded-md justify-center items-center p-10 overflow-scroll">
        {children}
      </div>
    </div>
  );
}
