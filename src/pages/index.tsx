import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { Folder } from "./utils/types";
import filter from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFolder } from "react-icons/fa";
import Subfolder from "./subfolder";
import Root from "./root";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<Folder[]>([]);

  //fetch data from backend
  async function fetchFileSystem() {
    const fetchedData = await fetch("/api/getData").then((res) => res.json());
    const filteredData = filter(fetchedData);
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

  //filters filessytem of with the same id and prop drill to subfolder
  function filteredFilesSys(id: string, filesSystem: Folder[]) {
    return filesSystem.filter((match) => match.id === id);
  }

  //handle click on folder
  function handleClick(id: string) {
    const subfolderProps = filteredFilesSys(id, filesSystem);
    setMatchData(subfolderProps);
    setClicked(true);
  }

  if (!clicked) {
    return (
      <>
        <h1>root</h1>
        <Root
          filesSystem={filesSystem}
          setClicked={setClicked}
          handleClick={handleClick}
        />
      </>
    );
  } else {
    return (
      <>
        <h1>subfolder</h1>
        <Subfolder matchData={matchData} />
      </>
    );
  }
}

export default function () {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
