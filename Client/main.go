package main


import (
	"encoding/json"
	"fmt"
    "log"
	"net/http"
	"github.com/gorilla/mux"
	. "github.com/siongui/godom"
	"bytes"
	"io/ioutil"
	"text/template"
)
//QUE INSTALAR
//go get github.com/gorilla/mux
//go get github.com/gopherjs/gopherjs/js
//go get github.com/siongui/godom
type Page struct {
	Tittle string
}

type Respuesta struct {
	Entrada	 string `json:"entrada"` 
	AST     ast 	`json:"ast"`
	
}


type ast struct {
	Instructions []inst `json:"instructions"`

}

type inst struct {
	 Name string `json:"name"`

}


func EndPoint(w http.ResponseWriter, r *http.Request) {
	
	
	
	
	if r.URL.Path != "/analizar" {
        http.Error(w, "404 not found.", http.StatusNotFound)
        return
    }
 
    switch r.Method {
    case "GET":     
         //http.ServeFile(w, r, "index.html")
    case "POST":
        // Call ParseForm() to parse the raw query and update r.PostForm and r.Form.
        if err := r.ParseForm(); err != nil {
            fmt.Fprintf(w, "ParseForm() err: %v", err)
            return
        }
		//OBTENTO LA DATA DEL TEXT AREA
		content := r.FormValue("textAreaAnalizar")
		url := "http://localhost:3000/api/v1/server/analizar"

		//SE CREA EL JSON QUE SE VA A ENVIAR
		requestBody, err := json.Marshal(map[string]string{
			"entrada" 	: 	content,
			"consola"	:	"consola"}) 

		if err != nil {
			fmt.Println(err)
		} 

		////METODO POST
		resp, err := http.Post(url, "application/json", bytes.NewBuffer(requestBody))
		
		if err != nil {
			fmt.Println(err)
		}
		defer resp.Body.Close()
		//////


		///SE HACE UN JSON PARSE AL BODY DEL REQUEST PARA OBTENER LOS DATOS 
		//OBTENIDOS AL HACER POST
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			panic(err)
		}
		var t Respuesta
		err = json.Unmarshal(body, &t)
		if err != nil {
			panic(err)
		}
		
		//SE HACE UNA LLAMADA A LA PAGINA NUEVAMENTE
		http.ServeFile(w, r, "index.html")

		
		textArea := Document.GetElementById("textAreaAnalizar")
		textArea.SetTextContent("Hello World")


    default:
        fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
	}
	
}

func indexHandler(w http.ResponseWriter, req *http.Request){
	p := Page{ Tittle : "Proyecto 2"}
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, p)




	
}

func main() {
	router := mux.NewRouter()
	
	//endpoints
	router.HandleFunc("/", indexHandler)
	router.HandleFunc("/analizar", EndPoint).Methods("POST")
	
	
	log.Fatal(http.ListenAndServe(":8080", router))
	
}