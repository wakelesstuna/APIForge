import { useEffect, useState } from "react";
import { config } from "../../wailsjs/go/models";
import { FetchConfig } from "../../wailsjs/go/main/App";

function useConfig() {
  const [config, setConfig] = useState<config.Config>();

  useEffect(() => {
    const loadCofigFile = async () => {
      const resp = await FetchConfig();
      setConfig(resp);
    };

    void loadCofigFile();
  }, []);

  return { config };
}

export default useConfig;
