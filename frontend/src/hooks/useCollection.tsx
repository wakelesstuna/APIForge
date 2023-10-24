import { useEffect, useState } from "react";
import { backend } from "../../wailsjs/go/models";
import { FetchCollections } from "../../wailsjs/go/main/App";

function useCollection() {
  const [collection, setCollection] = useState<backend.Collection[]>();

  useEffect(() => {
    const fetchCollections = async () => {
      const resp = await FetchCollections();
      setCollection(resp);
    };

    void fetchCollections();
  }, []);

  return collection;
}

export default useCollection;
