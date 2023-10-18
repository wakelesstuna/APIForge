package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
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
