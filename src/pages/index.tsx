import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Folder } from "./utils/types";
import filter from "./utils/sort";
import LoadingSpinner from "@/components/loadingSpinner";
import { FaFolder } from "react-icons/fa";
import Subfolder from "./subfolder";

function Home() {
  const [filesSystem, setFileSystem] = useState<Folder[]>([]);
  const router = useRouter();

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
  function handleClick(id: string) {
    router.push("/subfolder");
    // return <Subfolder id
  }

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
                onClick={() => handleClick(i.id)}
              />
              <div>{i.name}</div>
            </div>
          );
        })}
      </div>
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
