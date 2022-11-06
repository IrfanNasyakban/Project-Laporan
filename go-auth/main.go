package main

import (
	"net/http"

	authcontroller "http//github.com/IrfanNasyakban/Project-Laporan/go-auth/controllers"
)

func main() {
	http.HandleFunc("/", authcontroller.Index)
}
