import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import sort, { File } from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFile, FaFolder, FaHome, FaBackward } from "react-icons/fa";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
  const [sub, setSub] = useState<number>(0);
  const [prev, setPrev] = useState<Folder[]>([]);
  const [screenSize, getDimension] = useState<Dimensions>({
    dynamicWidth: 0,
    dynamicHeight: 0,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const folderfileSize = (screenSize: Dimensions) => {
    return screenSize.dynamicWidth === 390 && screenSize.dynamicHeight === 844
      ? "50px"
      : "80px";
  };

  async function fetchFileSystem(data: Data[]) {
    const filteredData = sort(data);
    setFileSystem(filteredData);
  }

  //fecth the data every 30 secs when user revisits the app window
  useEffect(() => {
    fetchFileSystem(data);
    const interval = setInterval(() => {
      fetchFileSystem(data);
    }, 30000);

    window.addEventListener("focus", () => {
      fetchFileSystem(data);
    });
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", () => {
        fetchFileSystem(data);
      });
    };
  }, [data]);

  function handleClick(i: Folder) {
    setPrev((prev) => [...prev, i]);
    setMatchData([i]);
    setClicked(true);
  }

  function backHandleClick(prev: Folder[]) {
    const newPrev = prev.slice(0, -1);
    if (newPrev.length === 0) {
      setClicked(false);
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
      );
    }
  } else {
    if (matchData.length === 0) {
      setClicked(false);
      return <LoadingSpinner />;
    } else {
      return (
        <div
          className="grid md:grid-cols-5 grid-rows-5 grid-cols-2 place-items-center place-content-center"
          role="navigation"
          aria-label="File System Navigation"
        >
          <div
            className="flex flex-col justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
            active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
            role="link"
            aria-label="Go to root folders"
          >
            <FaHome
              size={folderfileSize(screenSize)}
              color="skyblue"
              onClick={() => setClicked(false)}
              role="img"
              aria-label="Home"
            />
            <div className=" md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center">
              Root Folders
            </div>
          </div>
          <div
            className="flex flex-col justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
            active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
            role="button"
            aria-label="Go back to previous folder"
          >
            <FaBackward
              size={folderfileSize(screenSize)}
              color="skyblue"
              aria-label="Go back"
              role="button"
              onClick={() => backHandleClick(prev)}
            />
            <div
              className=" md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center"
              role="text"
              aria-label="Back"
            >
              Back
            </div>
          </div>
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
                  <FaFile size={folderfileSize(screenSize)} color="white" />
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
