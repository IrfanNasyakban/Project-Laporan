package controllers

import (
	"html/template"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {

	temp, _ := template.ParseFiles("views/index.html")
	temp.Execute(w, nil)

}

func Login(w http.ResponseWriter, r *http.Request) {
	temp, _ := template.ParseFiles("views/login.html")
	temp.Execute(w, nil)
}
