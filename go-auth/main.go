package main

import (
	"fmt"
	"net/http"

	authcontroller "github.com/IrfanNasyakban/go-auth/controller"
)

func main() {
	http.HandleFunc("/", authcontroller.Index)

	fmt.Println("server berjalan di: http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
