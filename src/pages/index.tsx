import Layout from "@/layout/layout";
import { useState, useEffect } from "react";
import { Folder } from "./utils/types";

import filter from "./utils/sort";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);

  //fetch data from backend
  async function fetchFileSystem() {
    const fetchedData = await fetch("/api/getData").then((res) => res.json());
    const filteredData = filter(fetchedData);
    console.log(filteredData);
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

  return (
    <>
      <div>root</div>
    </>
  );
}

export default function () {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
