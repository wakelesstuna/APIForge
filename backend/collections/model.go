package collections

type ItemType = string

const (
	FOLDER       ItemType = "FOLDER"
	HTTP_REQUEST          = "HTTP_REQUEST"
	COLLECTION            = "COLLECTION"
)

type Collection struct {
	Id            string   `json:"id"`
	Name          string   `json:"name"`
	CollectionDir string   `json:"collectionDir"`
	Type          ItemType `json:"type"`
	Items         []Item   `json:"items"`
}

type Item struct {
	Id      string   `json:"id"`
	Name    string   `json:"name"`
	Type    ItemType `json:"type"`
	Items   []Item   `json:"items"`
	Request *Request `json:"request"`
}

type Request struct {
	Url     string            `json:"id"`
	Method  string            `json:"method"`
	Headers map[string]string `json:"headers"`
	Params  map[string]string `json:"params"`
	Body    Body              `json:"body"`
}

type Body struct {
	Mode           string `json:"mode"`
	Json           string `json:"json"`
	Text           string `json:"text"`
	MultipartForm  string `json:"multipartForm"`
	FormUrlEncoded string `json:"formUrlEncoded"`
}
