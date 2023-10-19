package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type HttpRequest struct {
	Url    string `json:"url"`
	Method string `json:"method"`
}

func (a *App) SendRequest(request HttpRequest) string {
	fmt.Printf("Sending request to %s\n", request.Url)
	resp, err := http.Get(request.Url)

	if err != nil {
		log.Printf(err.Error())
		return ""
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Reading body failed: %s", err)
		return ""
	}
	// Log the request body
	bodyString := string(body)
	return fmt.Sprintf(bodyString)
}

type CreateCollectionRequest struct {
	Name string `json:"name"`
}

func (a *App) CreateCollection(request CreateCollectionRequest) string {
	createFolders(request.Name)
	writeFile(request, request.Name, request.Name)
	return ""
}

func createFolders(path string) {

	exists, err := folderExists(path)
	if err != nil {
		fmt.Println("Error checking folder existence:", err)
		return
	}

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

func folderExists(folderPath string) (bool, error) {
	_, err := os.Stat(folderPath)

	if os.IsNotExist(err) {
		return false, nil
	} else if err != nil {
		return false, err
	}

	return true, nil
}

func writeFile(value CreateCollectionRequest, name string, folderPath string) {
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
