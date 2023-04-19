export type Data = {
  id: string;
  type: "folder" | "file";
  parent: string | null;
  name: string;
  ext?: string;
};

export type Folder = {
  type: "folder";
  id: string;
  name: string;
  subfolders: Folder[];
  files: File[];
};

export type File = {
  type: "file";
  id: string;
  name: string;
  ext?: string;
};
