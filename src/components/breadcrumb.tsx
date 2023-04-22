import { Folder } from "@/pages";

type BreadcrumbProps = {
  prev: Folder[];
};

export default function Breadcrumb({ prev }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex">
      {prev.map((folder, index) => (
        <div key={folder.id}>
          {index > 0 && <span className="mx-2 text-gray-400">&#8249;</span>}
          <span className="text-gray-400">{folder.name}</span>
        </div>
      ))}
    </nav>
  );
}
