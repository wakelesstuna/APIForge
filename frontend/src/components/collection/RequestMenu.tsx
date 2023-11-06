import React, { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import RemoveItem from "./RemoveItem";
import { collections } from "../../../wailsjs/go/models";

interface RequestMenuProps {
  collection: collections.Collection;
  item: collections.Item;
}
function RequestMenu({ collection, item }: RequestMenuProps) {
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
              <RemoveItem item={item} collection={collection} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RequestMenu;
