import { Folder } from "./types";

//filters filessytem of with the same id and prop drill to subfolder
export function filteredFilesSys(id: string, arr: Folder[]) {
  const res = arr.filter((item) => item.id === id);
  return res;
}
