package main

import (
	"net/http"
	"path/filepath"
)

func main() {
	// Define the directory to serve
	staticDir := "../client/dist/client/"

	// Create a new file server handler
	fileServer := http.FileServer(http.Dir(staticDir))

	// Create a handler that serves both the Angular app and the API
	http.Handle("/", http.StripPrefix("/", fileServer))

	// Start the server
	port := 8080
	serverAddress := "0.0.0.0:8080"
	println("Server is running on http://localhost:" + string(port))
	err := http.ListenAndServe(serverAddress, nil)
	if err != nil {
		panic(err)
	}
}
