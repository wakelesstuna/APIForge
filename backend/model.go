package backend

type AppResponse struct {
	Status int   `json:"status"`
	Data   any   `json:"data"`
	Error  Error `json:"error"`
}

type Error struct {
	Status  int    `json:"status"`
	Message string `json:"messsage"`
}
