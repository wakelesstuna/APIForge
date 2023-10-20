package utils

import (
	"encoding/json"
	"fmt"
	"os"
)

func CreateFolders(path string) {
	exists := FolderExists(path)

	if exists {
		return
	} else {
		err := os.Mkdir(path, 0755)
		if err != nil {
			fmt.Println("Error creating folder:", err)
			return
		}
	}
}

func FolderExists(folderPath string) bool {
	_, err := os.Stat(folderPath)

	if os.IsNotExist(err) {
		return false
	} else if err != nil {
		return false
	}

	return true
}

func WriteFile(value string, name string, folderPath string) {
	data, err := json.MarshalIndent(value, "", "")

	if err != nil {
		fmt.Println("Error marshilling JSON:", err)
		return
	}

	file, err := os.Create(folderPath + "/" + name + ".json")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}

	defer file.Close()

	_, err = file.Write(data)
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}
	return
}
