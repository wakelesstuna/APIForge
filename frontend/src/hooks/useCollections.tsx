import React, { useEffect, useState } from "react";
import { collections } from "../../wailsjs/go/models";
import { GetCollections } from "../../wailsjs/go/main/App";

function useCollections() {
  const [collections, setCollections] = useState<collections.Collection[]>();
  const dirPath = "D:\\projects\\go-api-forge\\collections\\demo";

  const refresh = () => void fetchCollections();

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
