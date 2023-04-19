import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { Folder } from "./utils/types";
import filter from "./utils/sort";
import Subfolder from "./subfolder";
import Root from "./root";
import { filteredFilesSys } from "./utils/filtered";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const [matchData, setMatchData] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

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

  //handle click on folder
  function handleClick(id: string, arr: Folder[]) {
    const subfolderProps = filteredFilesSys(id, arr);
    setMatchData(subfolderProps);
    setClicked(true);
  }

  if (!clicked) {
    return (
      <>
        <h1>Root</h1>
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
        <h1>Subfolder</h1>
        <button onClick={() => setClicked(false)}>Back</button>
        <Subfolder matchData={matchData} handleClick={handleClick} />
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
