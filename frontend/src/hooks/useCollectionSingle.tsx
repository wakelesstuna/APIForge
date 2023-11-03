import { useEffect, useState } from "react";
import { backend, collections } from "../../wailsjs/go/models";
import { FetchCollections, GetCollection } from "../../wailsjs/go/main/App";

function useCollectionSingle(path: string) {
  const [collection, setCollection] = useState<collections.Collection>();

  useEffect(() => {
    const fetchCollection = async () => {
      const resp = await GetCollection(path);
      setCollection(resp);
    };

    void fetchCollection();
  }, []);

  return collection;
}

export default useCollectionSingle;
