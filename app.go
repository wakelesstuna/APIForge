package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/wakelesstuna/backend"
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

func (a *App) SendRequest(request HttpRequest) string {
	fmt.Printf("Sending request to %s\n", request.Url)
	resp, err := http.Get(request.Url)

	if err != nil {
		log.Printf(err.Error())
		return ""
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Reading body failed: %s", err)
		return ""
	}
	// Log the request body
	bodyString := string(body)
	return fmt.Sprintf(bodyString)
}

type HttpRequest struct {
	Url    string `json:"url"`
	Method string `json:"method"`
}

type CreateCollectionRequest struct {
	Name string `json:"name"`
}

func (a *App) CreateCollection(name string) string {
	return backend.CreateCollection(name)
}

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
