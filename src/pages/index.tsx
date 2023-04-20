import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { Folder, Dimensions } from "./utils/types";
import { filteredFilesSys } from "./utils/filtered";
import sort from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFile, FaFolder, FaHome } from "react-icons/fa";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const [matchData, setMatchData] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
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
    return screenSize.dynamicWidth === 375 && screenSize.dynamicHeight === 667
      ? "50px"
      : "80px";
  };

  //fetch data from backend
  async function fetchFileSystem() {
    const fetchedData = await fetch("/api/getData").then((res) => res.json());
    const filteredData = sort(fetchedData);
    setFileSystem(filteredData);
  }

  //fecth the data every 30 secs when user revisits the app window
  useEffect(() => {
    fetchFileSystem();
    const interval = setInterval(() => {
      fetchFileSystem();
    }, 30000);

    window.addEventListener("focus", () => {
      fetchFileSystem();
    });
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", () => {
        fetchFileSystem();
      });
    };
  }, []);

  //handle click on folder
  function handleClick(i: Folder) {
    if (i.parent === null) {
      const rootMatch = filteredFilesSys(i.id, filesSystem);
      setMatchData(rootMatch);
      setClicked(true);
    } else {
      const matched = [i];
      setMatchData(matched);
      setClicked(true);
    }
  }

  if (!clicked) {
    if (filesSystem.length === 0) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className="grid md:grid-cols-5 grid-rows-5 grid-cols-2 place-items-center place-content-center">
          {filesSystem.map((i) => {
            return (
              <div
                className="flex justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
               active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
                key={i.id}
              >
                <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                  <FaFolder
                    size={folderfileSize(screenSize)}
                    color="skyblue"
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
      return <LoadingSpinner />;
    } else {
      return (
        <div className="grid md:grid-cols-5 grid-rows-5 grid-cols-2 place-items-center place-content-center">
          <div
            className="flex flex-col justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
            active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
          >
            <FaHome
              size={folderfileSize(screenSize)}
              color="skyblue"
              onClick={() => setClicked(false)}
            />
            <div className=" md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center">
              Root Folders
            </div>
          </div>
          {matchData[0].subfolders.map((i) => {
            return (
              <div
                className="flex justify-center md:h-[190px] h-[100px] md:w-[150px] w-[90px] rounded-md items-center hover:bg-slate-300
                active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 p-2"
                key={i.id}
              >
                <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                  <FaFolder
                    size={folderfileSize(screenSize)}
                    color="skyblue"
                    onClick={() => handleClick(i)}
                  />
                  <div className="md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center truncate">
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
              >
                <div className="grid grid-rows-2 md:h-[120px] md:w-[100px] h-[100px] w-[90px] place-items-center place-content-center">
                  <FaFile size={folderfileSize(screenSize)} color="white" />
                  <div className="md:w-[100px] w-[50px] h-[30px] md:text-base text-[12px] font-light md:font-normal text-center truncate">
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

export default function () {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
