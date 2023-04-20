import LoadingSpinner from "@/components/loadingSpinner";
import { Dispatch, SetStateAction } from "react";
import { FaFolder } from "react-icons/fa";
import { Folder } from "./utils/types";
type RootProps = {
  filesSystem: Folder[];
  setClicked: Dispatch<SetStateAction<boolean>>;
  handleClick: (i: Folder, arr: Folder[]) => void;
};

export default function Root({
  filesSystem,
  setClicked,
  handleClick,
}: RootProps) {
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
                onClick={() => handleClick(i, filesSystem)}
              />
              <div>{i.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
