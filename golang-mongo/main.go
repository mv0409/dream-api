package main

import (
	"net/http"

	dream_routes "github.com/mv0409/k7-tech/go-mongo/routes"
)

func routes() http.Handler {
	return dream_routes.HandleDreamRoutes()
}

func main() {
	http.ListenAndServe(":8081", routes())
}
