import CreateCollectionButton from "./components/collection/CreateCollectionButton";
import HttpRequest from "./components/http-request/HttpRequest";
import TopMenu from "./components/menu/TopMenu";
import useConfig from "./hooks/useConfig";

function App() {
  const config = useConfig();

  return (
    <div className="bg-gray-800">
      <TopMenu />
      <HttpRequest />
      <CreateCollectionButton />
    </div>
  );
}

export default App;
