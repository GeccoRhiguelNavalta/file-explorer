import { Folder } from "./types";

//filters filessytem of with the same id and prop drill to subfolder
export function filteredFilesSys(id: string, arr: Folder[]) {
  return arr.filter((match) => match.id === id);
}
