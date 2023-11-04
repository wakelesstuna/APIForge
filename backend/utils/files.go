package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func CreateDirectory(dir string) {

}

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
	if _, err := os.Stat(folderPath); os.IsNotExist(err) {
		return false
	}
	return true
}

func WriteFile(value any, name string, folderPath string) {
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

func PrintFile[T any](input T, filePath string) {
	data, err := json.MarshalIndent(input, "", "")

	if err != nil {
		fmt.Println("Error marshilling JSON:", err)
		return
	}

	file, err := os.Create(filePath)
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

func ReadFile(path string) []byte {
	file, err := os.ReadFile(path)
	CheckAndlogError(err)
	return file
}

func CheckAndlogError(e error) {
	if e != nil {
		fmt.Println("Error: ", e)
		panic(e)
	}
}

func OpenFolderChooser(ctx context.Context, options runtime.OpenDialogOptions) string {
	folder, err := runtime.OpenDirectoryDialog(ctx, options)

	if err != nil {
		fmt.Printf("Error selecting folder: %v", err)
		return ""
	}

	return folder
}

func FindFolder() {

}
