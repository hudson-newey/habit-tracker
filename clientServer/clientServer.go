package main

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	// Set routing rules
	http.HandleFunc("/", home)

	//Use the default DefaultServeMux.
	err := http.ListenAndServe("0.0.0.0:8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	programName := os.Args[1]
	io.WriteString(w, readFile(programName))
}

func readFile(fileName string) string {
	data, err := ioutil.ReadFile(fileName)
	if err != nil {
		return "Error 404, File not Found!"
	}

	return string(data)
}
