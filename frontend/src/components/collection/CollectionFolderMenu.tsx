import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NewFolderButton from "./NewFolderButton";
import { collections } from "../../../wailsjs/go/models";
import CollectionDeleteButton from "./CollectionDeleteButton";
import CollectionRenameButton from "./CollectionRenameButton";
import CollectionPropertiesButton from "./CollectionPropertiesButton";

interface CollectionFolderMenuProps {
  collection: collections.Collection;
}

function CollectionFolderMenu({ collection }: CollectionFolderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-5 -left-20 cursor-default text-white bg-gray-700 shadow-sm shadow-black"
        >
          <ul className="text-sm text-left">
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              New Request
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <NewFolderButton
                parentFolderId={collection.id}
                collectionId={collection.id}
              />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <CollectionRenameButton collection={collection} />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <CollectionDeleteButton collection={collection} />
            </li>
            <li className="hover:bg-blue-500 px-2 py-[1px] my-[1px]">
              <CollectionPropertiesButton collection={collection} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CollectionFolderMenu;
