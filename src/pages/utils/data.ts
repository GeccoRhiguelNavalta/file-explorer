import React from "react";

export type Data = {
  id: string;
  type: "folder" | "file";
  parent: string | null;
  ext?: string;
};
