import { useEffect, useState } from "react";
import { collections } from "../../wailsjs/go/models";
import { GetCollections } from "../../wailsjs/go/main/App";
import * as runtime from "../../wailsjs/runtime/runtime";

function useCollections() {
  const [collections, setCollections] = useState<collections.Collection[]>();
  const dirPath = "D:\\projects\\go-api-forge\\collections\\demo";

  const refresh = () => void fetchCollections();

  runtime.EventsOn("collections", (data: collections.Collection[]) => {
    console.log("New Event Collections! ", data);
    setCollections(data);
  });

  const fetchCollections = async () => {
    const resp = await GetCollections(dirPath);
    setCollections(resp);
  };

  useEffect(() => {
    void fetchCollections();
  }, []);

  return [collections];
}

export default useCollections;
