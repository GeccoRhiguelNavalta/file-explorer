import { Data, Folder } from "..";

export type File = {
  parent: string;
  type: "file";
  id: string;
  name: string;
  ext?: string;
};

export default function sort(data: Data[]): Folder[] {
  const rootFolders: Folder[] = [];

  // Map of folder IDs to their corresponding folder objects
  const foldersById: { [id: string]: Folder } = {};
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.type === "folder" && item.parent === null) {
        // Root folder
        const folder: Folder = {
          parent: item.parent,
          type: item.type,
          id: item.id,
          name: item.name,
          subfolders: [],
          files: [],
        };
        rootFolders.push(folder);
        foldersById[item.id] = folder;
      } else if (item.type === "folder" && item.parent !== null) {
        // Subfolder
        const parentFolder = foldersById[item.parent];
        const folder: Folder = {
          parent: item.parent,
          type: item.type,
          id: item.id,
          name: item.name,
          subfolders: [],
          files: [],
        };
        parentFolder?.subfolders.push(folder);
        foldersById[item.id] = folder;
      } else if (item.type === "file" && item.parent !== null) {
        // File
        const parentFolder = foldersById[item.parent];
        const file: File = {
          parent: item.parent,
          type: item.type,
          id: item.id,
          name: item.name,
          ext: item.ext,
        };
        parentFolder?.files.push(file);
      }
    }
  }
  return rootFolders;
}
