package backend

type AppResponse[T any] struct {
	Status int   `json:"status"`
	Data   T     `json:"data"`
	Error  Error `json:"error"`
}

type Error struct {
	Status  int    `json:"status"`
	Message string `json:"messsage"`
}
