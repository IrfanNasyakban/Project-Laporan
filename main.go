package main

import (
	"fmt"
	"net/http"

	authcontroller "github.com/IrfanNasyakban/Project-Laporan/controller"
)

func main() {
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets", fs))

	http.HandleFunc("/", authcontroller.Index)
	http.HandleFunc("/login", authcontroller.Login)

	fmt.Println("server berjalan di: http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
