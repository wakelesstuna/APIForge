import CreateCollectionButton from "./components/collection/CreateCollectionButton";
import HttpRequest from "./components/http-request/HttpRequest";

function App() {
  return (
    <div className="bg-gray-800">
      <p className="">Logo Goes Here</p>
      <HttpRequest />
      <CreateCollectionButton />
    </div>
  );
}

export default App;
