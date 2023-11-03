import { useState } from "react";
import CreateCollectionButton from "./components/collection/CreateCollectionButton";
import MenuButton from "./components/collection/FolderMenuButton";
import NewFolderButton from "./components/collection/NewFolderButton";
import RenameCollectionButton from "./components/collection/RenameCollectionButton";
import HttpRequest from "./components/http-request/HttpRequest";
import TopMenu from "./components/menu/TopMenu";
import useCollection from "./hooks/useCollection";
import useCollectionSingle from "./hooks/useCollectionSingle";
import useConfig from "./hooks/useConfig";
import { collections } from "../wailsjs/go/models";
import { GetCollection } from "../wailsjs/go/main/App";
import FolderMenu from "./components/folder-menu/FolderMenu";

function App() {
  const config = useConfig();
  const [c, sC] = useState<collections.Collection | undefined>();
  const test = () => {
    const fetchCollection = async () => {
      const resp = await GetCollection(
        "D:\\projects\\go-api-forge\\collections\\demo\\demo.json"
      );
      sC(resp);
    };

    void fetchCollection();
  };

  const [currentRequest, setCurrentRequest] = useState<collections.Request>();

  return (
    <div className="bg-gray-800">
      <TopMenu />
      <HttpRequest />
      <CreateCollectionButton />
      <NewFolderButton folderPath="D:\\projects\\go-api-forge\\collections\\" />
      <div className="ml-40">
        <MenuButton currentFolderPath="D:\\projects\\go-api-forge\\collections\\test" />
      </div>
      <button onClick={test}>GET collection</button>
      <pre>{JSON.stringify(c, null, 4)}</pre>
      <div className="h-2 bg-gray-200 w-full"></div>
      <FolderMenu setCurrentRequest={setCurrentRequest} />
      <p className="text-white" onClick={() => setCurrentRequest(undefined)}>
        X
      </p>
      <pre>{JSON.stringify(currentRequest, null, 4)}</pre>
    </div>
  );
}

export default App;
