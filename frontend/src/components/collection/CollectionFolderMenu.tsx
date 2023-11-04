import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NewFolderButton from "./NewFolderButton";
import { collections } from "../../../wailsjs/go/models";
import CollectionDeleteButton from "./CollectionDeleteButton";
import RenameCollectionButton from "./RenameCollectionButton";
import CollectionRenameButton from "./CollectionRenameButton";

interface CollectionFolderMenuProps {
  collection: collections.Collection;
}

function CollectionFolderMenu({ collection }: CollectionFolderMenuProps) {
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
              <NewFolderButton folderPath="" />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <CollectionRenameButton collection={collection} />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <CollectionDeleteButton collection={collection} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CollectionFolderMenu;
