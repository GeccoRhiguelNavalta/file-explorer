export type Data = {
  id: string;
  type: "folder" | "file";
  parent: string | null;
  name: string;
  ext?: string;
};

export type Folder = {
  parent?: string | null;
  type: "folder";
  id: string;
  name: string;
  subfolders: Folder[];
  files: File[];
};

export type File = {
  parent: string;
  type: "file";
  id: string;
  name: string;
  ext?: string;
};

export type Dimensions = {
  dynamicWidth: number;
  dynamicHeight: number;
};
