package request

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func SendRequest(request HttpRequest) string {
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
