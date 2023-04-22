import { Folder } from "@/pages";

type BreadcrumbProps = {
  prev: Folder[];
};

export default function Breadcrumb({ prev }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-row">
      {prev.map((folder, index) => (
        <div key={folder.id} className="flex flex-row overflow-hidden">
          {index > 0 && (
            <span className="mx-2 text-gray-400 md:font-normal font-light md:text-lg text-xs">
              &#8249;
            </span>
          )}
          <span className="text-gray-400 md:font-normal font-light md:text-lg text-xs flex flex-row text-ellipsis">
            {folder.name}
          </span>
        </div>
      ))}
    </nav>
  );
}
