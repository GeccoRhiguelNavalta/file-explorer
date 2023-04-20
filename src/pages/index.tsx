import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { Folder } from "./utils/types";
import root from "./root";
import Root from "./root";
import { filteredFilesSys } from "./utils/filtered";
import sort from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFile, FaFolder } from "react-icons/fa";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const [matchData, setMatchData] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

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
        <div className="grid grid-cols-5 gap-5">
          {filesSystem.map((i) => {
            return (
              <div
                className="grid grid-rows-2 w-[100px] justify-center items-center"
                key={i.id}
              >
                <FaFolder
                  size="100px"
                  color="skyblue"
                  onClick={() => handleClick(i)}
                />
                <div>{i.name}</div>
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
        <div className="grid grid-cols-5 gap-5">
          <button onClick={() => setClicked(false)}>Back</button>
          {matchData[0].subfolders.map((i) => {
            return (
              <div
                className="grid grid-rows-2 w-[100px] justify-center items-center"
                key={i.id}
              >
                <FaFolder
                  size="100px"
                  color="skyblue"
                  onClick={() => handleClick(i)}
                />
                <div>{i.name}</div>
              </div>
            );
          })}
          {matchData[0].files.map((i) => {
            return (
              <div
                className="grid grid-rows-2 w-[100px] justify-center items-center"
                key={i.id}
              >
                <FaFile size="80px" color="white" />
                <div>{i.name}</div>
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
