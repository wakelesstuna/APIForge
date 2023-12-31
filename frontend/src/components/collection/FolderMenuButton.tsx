import { BsThreeDots } from "react-icons/bs";
import RemoveItem from "./RemoveItem";
import { collections } from "../../../wailsjs/go/models";
import { useState } from "react";

interface Props {
  collection: collections.Collection;
  item: collections.Item;
}

function FolderMenuButton({ collection, item }: Props) {
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
              <RemoveItem collection={collection} item={item} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FolderMenuButton;
