package config

type Config struct {
	Collections []Collection `json:"collections"`
}

type Collection struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	DirPath string `json:"dirPath"`
}
