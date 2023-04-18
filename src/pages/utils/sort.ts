/**
 function to sort data into
 root folder, subfolder and files
 return an array containing sorted data
 root folders if type === folder && parent === null
 contains type === folder but has parent and will contain an array with all the same parent
 contains type === files and will contain an array with all the same parent
 * 
 */

import { Data, Folder, File } from "./types";

export default function filter(data: Data[]): Folder[] {
  const rootFolders: Folder[] = [];

  // Map of folder IDs to their corresponding folder objects
  const foldersById: { [id: string]: Folder } = {};

  for (const item of data) {
    if (item.type === "folder" && item.parent === null) {
      // Root folder
      const folder: Folder = {
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
        id: item.id,
        name: item.name,
        ext: item.ext,
      };
      parentFolder?.files.push(file);
    }
  }
  return rootFolders;
}
