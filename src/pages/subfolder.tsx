import LoadingSpinner from "@/components/loadingSpinner";
import { FaFolder, FaFile } from "react-icons/fa";
import { Folder } from "./utils/types";

export default function Subfolder({ matchData }: { matchData: Folder[] }) {
  const subfoldersAndFiles = [
    ...matchData[0].subfolders,
    ...matchData[0].files,
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
                <FaFolder size="100px" color="skyblue" />
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
