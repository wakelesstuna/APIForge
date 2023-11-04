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

func AddCollection(id string, name string, dirPath string) {
	collection := Collection{Id: id, Name: name, DirPath: dirPath}
	cfg := FetchConfig()
	cfg.Collections = append(cfg.Collections, collection)
	saveConfig(cfg)
}

func DeleteCollection(id string) {
	cfg := FetchConfig()
	var updatedItems []Collection

	for _, item := range cfg.Collections {
		if item.Id != id {
			updatedItems = append(updatedItems, item)
		}
	}

	cfg.Collections = updatedItems
	saveConfig(cfg)
}

func RenameCollection(newName string, collectionId string) {
	cfg := FetchConfig()

	for i, collection := range cfg.Collections {
		if collection.Id == collectionId {
			cfg.Collections[i].Name = newName
			break
		}
	}

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
