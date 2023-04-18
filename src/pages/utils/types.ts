export type Data = {
  id: string;
  type: "folder" | "file";
  parent: string | null;
  name: string;
  ext?: string;
};

export type Folder = {
  id: string;
  name: string;
  subfolders: Folder[];
  files: File[];
};

export type File = {
  id: string;
  name: string;
  ext?: string;
};
