package collections

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/google/uuid"
	"github.com/wakelesstuna/backend"
	"github.com/wakelesstuna/backend/config"
	"github.com/wakelesstuna/backend/utils"
)

func GetCollections() []Collection {
	var collections []Collection

	cfg := config.FetchConfig()

	for _, collection := range cfg.Collections {
		dir1 := filepath.Join(collection.DirPath, collection.Name+utils.JsonFileExtenstion)
		fmt.Println(dir1)
		collections = append(collections, GetCollection(dir1))
	}

	return collections
}

func GetCollection(path string) Collection {
	var collection Collection
	data := utils.ReadFile(path)
	json.Unmarshal(data, &collection)

	return collection
}

func CreateCollection(collectionFolderName string, collectionlocation string) backend.AppResponse {
	var resp backend.AppResponse
	var collection Collection

	collection.Id = uuid.NewString()
	collection.Name = collectionFolderName
	collection.CollectionDir = collectionlocation
	collection.Type = COLLECTION

	saveCollection(collection)
	config.AddCollection(collection.Id, collection.Name, collection.CollectionDir)
	resp.Status = 200
	return resp
}

func RenameCollection(newName string, collectionId string) backend.AppResponse {
	var resp backend.AppResponse
	cfg := config.FetchConfig()

	collection := findCollectionById(cfg.Collections, collectionId)

	oldAbsolutePath := filepath.Join(collection.DirPath, collection.Name+utils.JsonFileExtenstion)
	newAbsolutePath := filepath.Join(collection.DirPath, newName+utils.JsonFileExtenstion)

	if err := os.Rename(oldAbsolutePath, newAbsolutePath); err != nil {
		resp.Status = 500
		resp.Error.Status = 500
		resp.Error.Message = err.Error()
		return resp
	}

	coll := GetCollection(newAbsolutePath)
	coll.Name = newName
	saveCollection(coll)

	config.RenameCollection(newName, collectionId)
	resp.Status = 200
	return resp
}

func NewFolder(folderName string, parentFolderId string, collectionId string) backend.AppResponse {
	var resp backend.AppResponse

	collections := GetCollections()

	for i, collection := range collections {
		if collection.Id == collectionId {
			collections[i].Items = append(collection.Items, Item{Id: uuid.NewString(), Name: folderName, Type: FOLDER, Request: nil})
			saveCollection(collections[i])
			resp.Status = 201
			return resp
		}
	}

	resp.Status = 404
	return resp
}

func NewRequest(request CreateNewHttpRequest) backend.AppResponse {
	var resp backend.AppResponse

	collections := GetCollections()

	item := Item{
		Id:   uuid.NewString(),
		Name: request.Name,
		Type: HTTP_REQUEST,
		Request: &Request{
			Url:    request.Url,
			Method: request.Method,
		},
	}

	for i, collection := range collections {
		if collection.Id == request.CollectionId {
			if request.ParentFolderId == request.CollectionId {
				collections[i].Items = append(collection.Items, item)
			} else {
				if foundItem := findItemById(request.ParentFolderId, collection.Items); foundItem != nil {
					foundItem.Items = append(foundItem.Items, item)
				}
			}
			saveCollection(collections[i])
			resp.Status = 201
			return resp
		}
	}

	resp.Status = 404
	return resp
}

func DeleteItem(collectionId string, itemId string) backend.AppResponse {
	var resp backend.AppResponse

	colletions := GetCollections()

	collectionIndex := -1
	indexToDelete := -1

	for i, collection := range colletions {
		if collection.Id == collectionId {
			collectionIndex = i
			break
		}
	}

	if collectionIndex == -1 {
		resp.Status = 404
		resp.Error.Message = "Could not find collection with id: " + collectionId
		resp.Error.Status = 404
		return resp
	}

	for i, item := range colletions[collectionIndex].Items {
		if item.Id == itemId {
			indexToDelete = i
			colletions[collectionIndex].Items = append(colletions[collectionIndex].Items[:indexToDelete], colletions[collectionIndex].Items[indexToDelete+1:]...)
			break
		}
	}

	if indexToDelete == -1 {
		resp.Status = 404
		resp.Error.Message = "Could not find item with id: " + itemId
		resp.Error.Status = 404
		return resp
	}

	saveCollection(colletions[collectionIndex])
	resp.Status = 204
	return resp
}

func DeleteCollection(collectionId string) backend.AppResponse {
	var resp backend.AppResponse
	cfg := config.FetchConfig()

	for _, collection := range cfg.Collections {
		if collection.Id == collectionId {
			err := os.Remove(filepath.Join(collection.DirPath, collection.Name+utils.JsonFileExtenstion))
			if err != nil {
				resp.Status = 500
				resp.Error.Status = 500
				resp.Error.Message = err.Error()
				return resp
			}
			config.DeleteCollection(collection.Id)
			resp.Status = 204
			return resp
		}
	}
	resp.Status = 404
	return resp
}

func findCollectionById(collections []config.Collection, id string) config.Collection {
	for _, collection := range collections {
		if collection.Id == id {
			return collection
		}
	}
	return config.Collection{}

}

func findItemById(id string, items []Item) *Item {
	for i := range items {
		if items[i].Id == id {
			return &items[i]
		}

		if foundItem := findItemById(id, items[i].Items); foundItem != nil {
			return foundItem
		}
	}
	return nil
}

func saveCollection(collection Collection) {
	utils.WriteFile(collection, filepath.Join(collection.CollectionDir, collection.Name+utils.JsonFileExtenstion))
}

func CreateItem(request CreateItemRequest) backend.AppResponse {
	var resp backend.AppResponse
	var item Item

	collections := GetCollections()

	if request.Type == FOLDER {
		// validera input
		item = Item{
			Id:   uuid.NewString(),
			Name: request.Name,
			Type: FOLDER,
		}
	}

	if request.Type == HTTP_REQUEST {
		// validera input
		item = Item{
			Id:   uuid.NewString(),
			Name: request.Name,
			Type: HTTP_REQUEST,
			Request: &Request{
				Url:    request.Url,
				Method: request.Method,
			},
		}
	}

	for i, collection := range collections {
		if collection.Id == request.CollectionId {
			if request.ParentFolderId == request.CollectionId {
				collections[i].Items = append(collection.Items, item)
			} else {
				if foundItem := findItemById(request.ParentFolderId, collection.Items); foundItem != nil {
					foundItem.Items = append(foundItem.Items, item)
				}
			}
			saveCollection(collections[i])
			resp.Status = 201
			return resp
		}
	}

	resp.Status = 404
	return resp
}
