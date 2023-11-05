package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/wakelesstuna/backend"
	"github.com/wakelesstuna/backend/collections"
	"github.com/wakelesstuna/backend/config"
	"github.com/wakelesstuna/backend/request"
	"github.com/wakelesstuna/backend/utils"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SendRequest(input request.HttpRequest) string {
	return request.SendRequest(input)
}

func (a *App) FetchConfig() config.Config {
	return config.FetchConfig()
}

func (a *App) SelectFolder() string {
	var options runtime.OpenDialogOptions
	return utils.OpenFolderChooser(a.ctx, options)
}

func (a *App) CreateCollection(name string, dirPath string) backend.AppResponse {
	response := collections.CreateCollection(name, dirPath)
	runtime.EventsEmit(a.ctx, "collections", collections.GetCollections())
	return response
}

func (a *App) RenameCollection(newName string, collectionId string) backend.AppResponse {
	response := collections.RenameCollection(newName, collectionId)
	if response.Status == 200 {
		runtime.EventsEmit(a.ctx, "collections", collections.GetCollections())
	}
	return response
}

func (a *App) CreateNewFolder(folderName string, parentFolderId string, collectionId string) backend.AppResponse {
	response := collections.NewFolder(folderName, parentFolderId, collectionId)
	if response.Status == 201 {
		runtime.EventsEmit(a.ctx, "collections", collections.GetCollections())
	}
	return response
}

func (a *App) CreateNewHttpRequest(request collections.CreateNewHttpRequest) backend.AppResponse {
	response := collections.NewRequest(request)
	if response.Status == 201 {
		runtime.EventsEmit(a.ctx, "collections", collections.GetCollections())
	}
	return response
}

func (a *App) GetCollection(path string) collections.Collection {
	return collections.GetCollection(path)
}

func (a *App) GetCollections(dirPath string) []collections.Collection {
	return collections.GetCollections()
}

func (a *App) RemoveCollection(collectionId string) backend.AppResponse {
	response := collections.DeleteCollection(collectionId)
	if response.Status == 204 {
		runtime.EventsEmit(a.ctx, "collections", collections.GetCollections())
	}
	return response
}
