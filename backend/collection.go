package backend

import (
	"fmt"
	"os"
	"os/user"

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

func getHomeDir() string {
	currentUser, err := user.Current()
	if err != nil {
		fmt.Println("Error:", err)
		return ""
	}
	homeDir := currentUser.HomeDir
	fmt.Printf("User's home directory: %s\n", homeDir)
	return homeDir
}

func CreateCollection(name string) string {
	collectionPath := "collections/" + name

	if utils.FolderExists(collectionPath) {
		return "Folder already exists."
	}

	if err := os.MkdirAll(collectionPath, 0755); err != nil {
		println("Error:", err)
		return err.Error()
	}
	println("Directory created successfully.")
	return "Directory created successfully."
}
