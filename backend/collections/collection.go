package collections

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/wakelesstuna/backend/utils"
)

func GetCollections(dirPath string) []Collection {
	var collections []Collection
	dir, err := os.Open(dirPath)
	if err != nil {
		fmt.Println("Error opening directory:", err)
		return nil
	}
	defer dir.Close()

	// Read the directory entries
	entries, err := dir.Readdir(-1)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return nil
	}

	// Iterate through the entries and print the filenames
	for _, entry := range entries {
		if entry.IsDir() {
			// If you want to skip directories, you can add a check here.
			continue
		}
		fmt.Println(entry.Name())
		collections = append(collections, GetCollection(filepath.Join(dirPath, entry.Name())))
	}
	return collections
}

func GetCollection(path string) Collection {
	var collection Collection
	data := utils.ReadFile(path)
	json.Unmarshal(data, &collection)

	return collection
}

func CreateCollection(collectionFolderName string, collectionlocation string) {
	dirPath := filepath.Join(collectionlocation, collectionFolderName)

	if utils.FolderExists(dirPath) {
		panic("collection: " + dirPath + " already exists")
	}

	if err := os.Mkdir(dirPath, 0755); err != nil {
		panic(err)
	}
}

func RenameCollection(newname string, collectionPath string) {
	println(collectionPath)
	newPath := filepath.Join(filepath.Dir(collectionPath), newname)
	println(newPath)
	if err := os.Rename(collectionPath, newPath); err != nil {
		fmt.Println("Error!")
		fmt.Println(err)
	}
}

func NewFolder(folderName string, folderPath string) {
	newFolder := filepath.Join(folderPath, folderName)
	fmt.Println(newFolder)

	if utils.FolderExists(newFolder) {
		panic("collection: " + newFolder + " already exists")
	}

	if err := os.Mkdir(newFolder, 0755); err != nil {
		panic(err)
	}
}
