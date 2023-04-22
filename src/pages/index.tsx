import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import sort, { File } from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFileAlt, FaFolder, FaHome, FaChevronLeft } from "react-icons/fa";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Breadcrumb from "@/components/breadcrumb";

export type Folder = {
  parent?: string | null;
  type: "folder";
  id: string;
  name: string;
  subfolders: Folder[];
  files: File[];
};

export type Data = {
  id: string;
  type: "folder" | "file";
  parent: string | null;
  name: string;
  ext?: string;
};

export type Dimensions = {
  dynamicWidth: number;
  dynamicHeight: number;
};

function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const [matchData, setMatchData] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [prev, setPrev] = useState<Folder[]>([]);
  const [screenSize, getDimension] = useState<Dimensions>({
    dynamicWidth: 0,
    dynamicHeight: 0,
  });

  //get current window size to change svg sizes for mobile responsive
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  const folderfileSize = (screenSize: Dimensions) => {
    return screenSize.dynamicWidth < 425 && screenSize.dynamicHeight < 850
      ? "50px"
      : "80px";
  };
  useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  //sort folders and files ready for DoM render
  function fetchFileSystem(data: Data[]) {
    const filteredData = sort(data);
    setFileSystem(filteredData);
  }

  //refetch function
  async function refetchFileSystem() {
    const refetchedData = await fetch("/api/refetch").then((res) => res.json());
    const refilteredData = sort(refetchedData);
    setFileSystem(refilteredData);
  }

  //fetch the data every 30 secs when user revisits the app window
  useEffect(() => {
    fetchFileSystem(data);
    refetchFileSystem();
    const interval = setInterval(() => {
      refetchFileSystem();
    }, 30000);
    window.addEventListener("focus", () => {
      refetchFileSystem();
    });
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", () => {
        refetchFileSystem();
      });
    };
  }, [data]);

  //handle forward recursive clicks into folders
  function handleClick(i: Folder) {
    setPrev((prev) => [...prev, i]);
    setMatchData([i]);
    setClicked(true);
  }

  //handle outward recursive clicks out of folders
  function backHandleClick(prev: Folder[]) {
    const newPrev = prev.slice(0, -1);
    if (newPrev.length === 0) {
      setClicked(false);
      setPrev([]);
    } else {
      const prevFolder = newPrev[newPrev.length - 1];
      setMatchData([prevFolder]);
      setPrev(newPrev);
      setClicked(true);
    }
  }

  if (!clicked) {
    if (filesSystem.length === 0) {
      return <LoadingSpinner />;
    } else {
      return (
        <>
          <div className="md:w-[1200px] w-[300px] h-[50px] bg-stone-100 sticky shadow p-3 grid grid-cols-[100px,auto] place-content-start place-items-start mb-5 md:mb-10 ">
            <div className="flex flex-row gap-2">
              <FaHome
                size="25px"
                color="grey"
                onClick={() => {
                  setClicked(false);
                  setPrev([]);
                }}
                role="img"
                aria-label="Home"
              />
              <FaChevronLeft
                size="25px"
                color="grey"
                aria-label="Go back"
                role="button"
                onClick={() => backHandleClick(prev)}
              />
            </div>
            <Breadcrumb prev={prev} />
          </div>
          <div
            className="grid md:grid-cols-5 grid-rows-5 grid-cols-2 place-items-center place-content-center"
            role="navigation"
            aria-label="File System Navigation"
          >
            {filesSystem.map((i) => {
              return (
                <div
                  className="flex justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
               active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
                  role="link"
                  aria-label={`Open ${i.name}`}
                  key={i.id}
                >
                  <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                    <FaFolder
                      size={folderfileSize(screenSize)}
                      color="skyblue"
                      role="img"
                      aria-label={`Folder ${i.name}`}
                      onClick={() => handleClick(i)}
                    />
                    <div className=" md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center truncate">
                      {i.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  } else {
    if (matchData.length === 0) {
      setClicked(false);
      return <LoadingSpinner />;
    } else {
      return (
        <>
          <div className="md:w-[1200px] w-[300px] h-[50px] bg-stone-100 sticky shadow p-3 grid grid-cols-[80px,150px] md:grid-cols-[100px,1100px] place-content-start place-items-start mb-5 md:mb-10 overflow-ellipsis">
            <div className="flex flex-row gap-2">
              <FaHome
                size="25px"
                color="dark-white"
                onClick={() => {
                  setClicked(false);
                  setPrev([]);
                }}
                role="img"
                aria-label="Home"
              />
              <FaChevronLeft
                size="25px"
                color="grey"
                aria-label="Go back"
                role="button"
                onClick={() => backHandleClick(prev)}
              />
            </div>
            <div className="flex overflow-hidden ">
              <Breadcrumb prev={prev} />
            </div>
          </div>
          <div
            className="grid md:grid-cols-5 grid-rows-5 grid-cols-2 place-items-center place-content-center"
            role="navigation"
            aria-label="File System Navigation"
          >
            {matchData[0].subfolders.map((i) => {
              return (
                <div
                  className="flex justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
                active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
                  key={i.id}
                  role="button"
                  aria-label={`${i.name} folder`}
                >
                  <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                    <FaFolder
                      size={folderfileSize(screenSize)}
                      color="skyblue"
                      onClick={() => handleClick(i)}
                    />
                    <div
                      className="md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center truncate"
                      role="text"
                      aria-label={i.name}
                    >
                      {i.name}
                    </div>
                  </div>
                </div>
              );
            })}
            {matchData[0].files.map((i) => {
              return (
                <div
                  className="flex justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
              active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
                  key={i.id}
                  role="button"
                  aria-label={`${i.name} file`}
                >
                  <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                    <FaFileAlt
                      size={folderfileSize(screenSize)}
                      color="white"
                    />
                    <div
                      className="md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center truncate"
                      role="text"
                      aria-label={i.ext ? `${i.name}.${i.ext}` : i.name}
                    >
                      {i.ext ? `${i.name}.${i.ext}` : i.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }
}

export default function a({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

//server side rendering to avoid data === unidentified
export const getServerSideProps: GetServerSideProps<{ data: Data[] }> = async (
  context
) => {
  const data = await fetch("https://dev.test.sega.co.uk/api/list", {
    headers: {
      "x-secret-api-key": process.env.SECRET_API_KEY!,
    },
  }).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
};
