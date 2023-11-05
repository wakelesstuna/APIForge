import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NewFolderButton from "./NewFolderButton";
import RenameCollectionButton from "./RenameCollectionButton";
import RemoveButton from "./RemoveButton";
import { collections } from "../../../wailsjs/go/models";

interface Props {
  collection: collections.Collection | collections.Item;
  currentFolderName: string;
}

function FolderMenuButton({ collection, currentFolderName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex">
      <button
        className="bg-transparent text-white text-2xl w-full h-full"
        onClick={() => setIsOpen((state) => !state)}
      >
        <BsThreeDots />
      </button>

      {isOpen && (
        <div
          onMouseLeave={handleMouseLeave}
          className="absolute top-6 -left-20 cursor-default text-white bg-gray-700 shadow-sm shadow-black"
        >
          <ul className="text-sm text-left">
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              New Request
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <NewFolderButton
                collectionId={collection.id}
                parentFolderId={""}
              />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <RenameCollectionButton
                collection={collection as collections.Collection}
                currentFolderName={currentFolderName}
              />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <RemoveButton collection={collection} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FolderMenuButton;
