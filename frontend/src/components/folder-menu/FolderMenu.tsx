import { Dispatch, SetStateAction, useState } from "react";
import { collections } from "../../../wailsjs/go/models";
import { cn } from "../../utils/tailwind.utils";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import useCollections from "../../hooks/useCollections";
import { getColorOfMethod } from "../../utils/http.utils";
import FolderMenuButton from "../collection/FolderMenuButton";
import useConfig from "../../hooks/useConfig";
import RequestMenuButton from "../collection/RequestMenuButton";
import CollectionFolderMenu from "../collection/CollectionFolderMenu";

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
                  request={item}
                  setCurrentRequest={setCurrentRequest}
                />
              );
            } else if (item.type === "FOLDER") {
              return (
                <FileExplorer
                  key={item.id}
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
  item: collections.Item;
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}

const FileExplorer = ({ item, setCurrentRequest }: FileExplorerProps) => {
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
            <FolderMenuButton collection={item} currentFolderName={item.name} />
          </div>
        </div>
        {expanded && (
          <div>
            {item.items?.map((subItem) => {
              if (subItem.type === "HTTP_REQUEST") {
                return (
                  <HttpRequest
                    key={subItem.id}
                    request={subItem}
                    setCurrentRequest={setCurrentRequest}
                  />
                );
              } else if (subItem.type === "FOLDER") {
                return (
                  <FileExplorer
                    key={subItem.id}
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
      request={item}
      setCurrentRequest={setCurrentRequest}
    />
  );
};

interface HttpRequestProps {
  request: collections.Item;
  setCurrentRequest: Dispatch<SetStateAction<collections.Request | undefined>>;
}
const HttpRequest = ({ request, setCurrentRequest }: HttpRequestProps) => {
  return (
    <div
      key={request.name}
      className="pl-8 cursor-pointer hover:bg-gray-300/10 text-gray-300 flex"
    >
      <p
        className="flex-1 peer"
        onClick={() => setCurrentRequest(request.request)}
      >
        <span
          className={cn(
            "font-semibold text-xs pr-2",
            getColorOfMethod(request.request.method)
          )}
        >
          {request.request.method}
        </span>
        {request.name}
      </p>
      <div className="opacity-0 peer-hover:opacity-100 hover:opacity-100 flex justify-end items-center">
        <RequestMenuButton />
      </div>
    </div>
  );
};
