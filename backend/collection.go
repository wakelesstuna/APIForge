package backend

import (
	"encoding/json"
	"os"
	"strings"

	"github.com/wakelesstuna/backend/config"
	"github.com/wakelesstuna/backend/utils"
)

type FileType int

const (
	FOLDER FileType = iota
	FILE
)

type Collection struct {
	Name    string  `json:"name"`
	Folders *[]File `json:"folders"`
}

type File struct {
	FileType FileType `json:"fileType"`
	Name     string   `json:"name"`
	Data     *Request `json:"request"`
	Files    *[]File  `json:"files"`
}

type Request struct {
	Url     string    `json:"url"`
	Method  string    `json:"method"`
	Params  *[]Param  `json:"params"`
	Headers *[]Header `json:"headers"`
	Body    *string   `json:"body"`
}

type Param struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	InUse bool   `json:"inUse"`
}

type Header struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	InUse bool   `json:"inUse"`
}

type CreateCollectionRequest struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

type CreateCollectionSubFolderRequest struct {
	CollectionName string `json:"collectionName"`
	Path           string `json:"path"`
	Name           string `json:"name"`
}

type CreateRequestRequest struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

func FetchCollections() []Collection {
	config := config.FetchConfig()
	collections := make([]Collection, 1)

	for _, x := range config.CollectionUrls {
		var collection Collection
		data := utils.ReadFile(x)
		json.Unmarshal(data, &collection)
		collections = append(collections, collection)
	}

	return collections
}

func CreateCollection(request CreateCollectionRequest) string {
	collectionPath := request.Path + "/" + request.Name

	if utils.FolderExists(collectionPath) {
		return "Folder already exists."
	}

	if err := os.MkdirAll(collectionPath, 0755); err != nil {
		println("Error:", err)
		return err.Error()
	}

	config.AddCollectionDir(collectionPath)
	println("Directory created successfully.")
	return "Directory created successfully."
}

func CreateCollectionSubFolder(request CreateCollectionSubFolderRequest) {
	config := config.FetchConfig()

	for _, x := range config.CollectionUrls {
		var collection Collection
		data := utils.ReadFile(x)
		json.Unmarshal(data, &collection)

	}
}

func CreateHttpRequest(name string, collectionName string, httpRequest HttpRequest) {
	config := config.FetchConfig()
	// find check if the collection name existis in config
	// create a httpRequest
}

func UpdateCollection(name string, updatedCollection Collection) {
	config := config.FetchConfig()
	var collection Collection
	for _, x := range config.CollectionUrls {
		if strings.Contains(x, name) {
			data := utils.ReadFile(x)
			json.Unmarshal(data, &collection)
		}
	}

}
