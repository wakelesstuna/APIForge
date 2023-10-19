package backend

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
