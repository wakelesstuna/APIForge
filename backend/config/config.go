package config

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/wakelesstuna/backend/utils"
)

var configFile = "config.json"

func FetchConfig() Config {
	path := getConfigPath()

	_ = os.Mkdir(path, 0700)

	fillPath := filepath.Join(path, configFile)

	if !utils.FolderExists(fillPath) {
		println("No config file found creating one.")
		utils.PrintFile(Config{}, fillPath)
	}
	println("Loading configs.")

	var cfg Config
	file := utils.ReadFile(fillPath)

	if err := json.Unmarshal(file, &cfg); err != nil {
		fmt.Printf("Error unmarshaling JSON: %v", err)
	}
	return cfg
}

func AddCollectionDir(path string) {
	cfg := FetchConfig()
	cfg.CollectionUrls = append(cfg.CollectionUrls, path)
	saveConfig(cfg)
}

func saveConfig(cfg Config) {
	utils.PrintFile(cfg, getConfigPath()+"/"+configFile)
}

func getConfigPath() string {
	value, _ := os.UserConfigDir()
	path := filepath.Join(value, "api-forge")
	return path
}
