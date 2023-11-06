import { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import CollectionFolderMenu from "../collection/CollectionFolderMenu";
import FolderMenuButton from "../collection/FolderMenuButton";
import RequestMenu from "../collection/RequestMenu";
import { cn } from "../../utils/tailwind.utils";
import { collections } from "../../../wailsjs/go/models";
import { getColorOfMethod } from "../../utils/http.utils";
import useCollections from "../../hooks/useCollections";

interface FolderMenuProps {
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}

function FolderMenu({ setCurrentRequest }: FolderMenuProps) {
  const [collections] = useCollections();
  console.log("Collections: ", collections);

  return (
    <div className="w-[250px]">
      {collections?.map((collection) => (
        <CollectionRoot
          key={collection.id}
          collection={collection}
          setCurrentRequest={setCurrentRequest}
        />
      ))}
    </div>
  );
}

export default FolderMenu;

interface CollectionRootProps {
  collection: collections.Collection;
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}

const CollectionRoot = ({
  collection,
  setCurrentRequest,
}: CollectionRootProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={collection.name} className="">
      <div className={cn("hover:bg-gray-300/10 text-gray-300 flex")}>
        <span
          className="cursor-pointer flex items-center px-2"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          {collection.name}
        </span>
        <div className="opacity-0 hover:opacity-100 flex justify-end flex-1 items-center">
          <CollectionFolderMenu collection={collection} />
        </div>
      </div>
      {expanded && (
        <div>
          {collection.items?.map((item) => {
            if (item.type === "HTTP_REQUEST") {
              return (
                <HttpRequest
                  key={item.name}
                  collection={collection}
                  item={item}
                  setCurrentRequest={setCurrentRequest}
                />
              );
            } else if (item.type === "FOLDER") {
              return (
                <FileExplorer
                  key={item.id}
                  collection={collection}
                  item={item}
                  setCurrentRequest={setCurrentRequest}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

interface FileExplorerProps {
  collection: collections.Collection;
  item: collections.Item;
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}

const FileExplorer = ({
  collection,
  item,
  setCurrentRequest,
}: FileExplorerProps) => {
  const [expanded, setExpanded] = useState(false);
  if (item.type === "FOLDER") {
    return (
      <div key={item.name} className={cn(`${"pl-4"}`)}>
        <div className={cn("hover:bg-gray-300/10 text-gray-300 flex")}>
          <span
            className="cursor-pointer flex items-center px-2"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
            {item.name}
          </span>
          <div className="opacity-0 hover:opacity-100 flex justify-end flex-1 items-center">
            <FolderMenuButton collection={collection} item={item} />
          </div>
        </div>
        {expanded && (
          <div>
            {item.items?.map((subItem) => {
              if (subItem.type === "HTTP_REQUEST") {
                return (
                  <HttpRequest
                    key={subItem.id}
                    collection={collection}
                    item={subItem}
                    setCurrentRequest={setCurrentRequest}
                  />
                );
              } else if (subItem.type === "FOLDER") {
                return (
                  <FileExplorer
                    key={subItem.id}
                    collection={collection}
                    item={subItem}
                    setCurrentRequest={setCurrentRequest}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    );
  }
  return (
    <HttpRequest
      key={item.id}
      collection={collection}
      item={item}
      setCurrentRequest={setCurrentRequest}
    />
  );
};

interface HttpRequestProps {
  collection: collections.Collection;
  item: collections.Item;
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}
const HttpRequest = ({
  collection,
  item,
  setCurrentRequest,
}: HttpRequestProps) => {
  if (item.request === undefined) {
    return <></>;
  }

  return (
    <div
      key={item.name}
      className="pl-8 cursor-pointer hover:bg-gray-300/10 text-gray-300 flex"
    >
      <p
        className="flex-1 peer"
        onClick={() => setCurrentRequest(item.request)}
      >
        <span
          className={cn(
            "font-semibold text-xs pr-2",
            getColorOfMethod(item.request.method)
          )}
        >
          {item.request.method}
        </span>
        {item.name}
      </p>
      <div className="opacity-0 peer-hover:opacity-100 hover:opacity-100 flex justify-end items-center">
        <RequestMenu item={item} collection={collection} />
      </div>
    </div>
  );
};
