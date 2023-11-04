import { useState } from "react";
import CreateCollectionButton from "./components/collection/CreateCollectionButton";
import MenuButton from "./components/collection/FolderMenuButton";
import NewFolderButton from "./components/collection/NewFolderButton";
import HttpRequest from "./components/http-request/HttpRequest";
import TopMenu from "./components/menu/TopMenu";
import useConfig from "./hooks/useConfig";
import { collections } from "../wailsjs/go/models";
import FolderMenu from "./components/folder-menu/FolderMenu";

function App() {
  const config = useConfig();

  const [currentRequest, setCurrentRequest] = useState<collections.Request>();

  return (
    <div className="bg-gray-800">
      <TopMenu />
      <HttpRequest />
      <CreateCollectionButton />
      <NewFolderButton folderPath="D:\\projects\\go-api-forge\\collections\\" />
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
