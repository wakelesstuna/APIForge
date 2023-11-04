package request

type HttpRequest struct {
	Url    string `json:"url"`
	Method string `json:"method"`
}
