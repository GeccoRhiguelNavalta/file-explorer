import LoadingSpinner from "@/components/loadingSpinner";
import { FaFolder } from "react-icons/fa";
import { Folder } from "./utils/types";

export default function Subfolder({ matchData }: { matchData: Folder[] }) {
  if (matchData.length === 0) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="grid grid-cols-5 gap-5">
        {matchData.map((i) => {
          return (
            <div
              className="grid grid-rows-2 w-[100px] justify-center items-center"
              key={i.id}
            >
              <FaFolder size="100px" color="skyblue" />
              <div>{i.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
