import LoadingSpinner from "@/components/loadingSpinner";
import { Dispatch, SetStateAction } from "react";
import { FaFolder, FaFile } from "react-icons/fa";
import { filteredFilesSys } from "./utils/filtered";
import { Folder } from "./utils/types";

type SubfolderProps = {
  matchData: Folder[];
  handleClick: (id: string, arr: Folder[]) => void;
};

export default function Subfolder({ matchData, handleClick }: SubfolderProps) {
  //not fixed bug when clicking on the folders within subfolder
  const subfoldersAndFiles = [
    ...matchData[0]?.subfolders,
    ...matchData[0]?.files,
  ];

  if (subfoldersAndFiles.length === 0) return <h1>Empty</h1>;
  if (matchData.length === 0) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="grid grid-cols-5 gap-5">
        {subfoldersAndFiles?.map((i) => {
          if (i.type === "file") {
            return (
              <div
                className="grid grid-rows-2 w-[100px] justify-center items-center"
                key={i.id}
              >
                <FaFolder
                  size="100px"
                  color="skyblue"
                  onClick={() => handleClick(i.id, matchData)}
                />
                <div>{i.name}</div>
              </div>
            );
          } else {
            return (
              <div
                className="grid grid-rows-2 w-[100px] justify-center items-center"
                key={i.id}
              >
                <FaFile size="80px" color="white" />
                <div>{i.name}</div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
