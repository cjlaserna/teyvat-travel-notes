// Folder.tsx
import React from "react";
import Image from "next/image";

interface FolderProps {
  folder: { id: string; iconUrl?: string; name: string };
  handleFolderSelection: (folderId: string) => void;
}

const FolderC: React.FC<FolderProps> = ({ folder, handleFolderSelection }) => (
  <div
    className="tag hover:cursor-pointer hover:contrast-125"
    onClick={() => {
      handleFolderSelection(folder.id);
    }}
  >
    <Image
      src={folder.iconUrl || "/imgs/uoicon.png"}
      width={50}
      height={50}
      alt={folder.name}
    />
  </div>
);

export default FolderC;
