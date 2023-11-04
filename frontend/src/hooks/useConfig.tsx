import { useEffect, useState } from "react";
import { config } from "../../wailsjs/go/models";
import { FetchConfig } from "../../wailsjs/go/main/App";

function useConfig() {
  const [config, setConfig] = useState<config.Config>();

  const getCollectionById = (id: string) => {
    return config?.collections.find((collection) => collection.id === id);
  };

  useEffect(() => {
    const loadCofigFile = async () => {
      const resp = await FetchConfig();
      setConfig(resp);
    };

    void loadCofigFile();
  }, []);

  return { config, getCollectionById };
}

export default useConfig;
