package main


import (
	"encoding/json"
	"fmt"
    "log"
	"net/http"
	"github.com/gorilla/mux"
	"bytes"
	"io/ioutil"
	"bufio"
	"os"
	"strconv"
	"text/template"
)

var arrayLexico []string
var arraySintactico []string
var textoActual = ""
var textoConsola = ""
//QUE INSTALAR
//go get github.com/gorilla/mux
//go get github.com/gopherjs/gopherjs/js
//go get github.com/siongui/godom
//go get honnef.co/go/js/dom


type Page struct {
	Tittle 	string
	Text 	string
	Console string
}

type Respuesta struct {
	Entrada	 string  `json:"entrada"` 
	AST      ast 	 `json:"ast"`
	Console  []string `json:"consola"`
	Type     string   `json:"type"`	 		
}


type ast struct {
	Instructions []inst `json:"instructions"`

}

type inst struct {
	 Name string `json:"name"`

}

type console struct {
	Content []data `json:"content"`
}

type data struct {
	Data string `json:"data"`

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
		textoActual = content
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
		fmt.Println(t)
		text := ""
		for i, s := range t.Console {
			fmt.Println(i)
			if t.Type == "lexico" {
				arrayLexico = append(arrayLexico, s)
			} else {
				arraySintactico = append(arraySintactico, s)
			}
			text = text + s + "\n"
		}
		textoConsola = text
		//SE HACE UNA LLAMADA A LA PAGINA NUEVAMENTE
		p := Page{ Tittle : "Proyecto 2", Text : content, Console: text}
		temp, _ := template.ParseFiles("index.html")
		temp.Execute(w, p)


    default:
        fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
	}
	
}




func GetError(w http.ResponseWriter, r *http.Request) {
	
	//CREA EL ARCHIVO HTML
	file, err :=os.Create("lexError.html")
	if err != nil {
		panic(err)
	}
	buf := bufio.NewWriter(file)



	var head = "<!DOCTYPE html>\n" +
	"<html>\n" +
	"<head>\n" +
	"    <meta charset='utf-8'>\n" +
	"    <meta http-equiv='X-UA-Compatible' content='IE=edge'>\n" +
	"    <title> Repote de Errores Lexicos" + "</title>\n" +
	"    <meta name='viewport' content='width=device-width, initial-scale=1'>\n" +
	"    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>\n" +
	"    <script src='main.js'></script>\n" +
	"    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
	"    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\">\n" +
	"</head>" +
	"<body>\n" +
	"  <nav class=\"navbar navbar-light bg-light\">\n" +
	"    <span class=\"navbar-brand mb-0 h1\">Compiladores 1</span>\n" +
	"  </nav>";

	var cadena2 = "<th scope =\"col\">No</th>\n" +
            "          <th scope=\"col\">Error</th>\n"

	var body1 = "<div class=\"container\">\n" +
	"    <div class=\"jumbotron jumbotron-fluid\">\n" +
	"      <div class=\"container\">\n" +
	"        <h1 class=\"display-4\"> Archivo de entrada"  + "</h1>\n" +
	"        <p class=\"lead\">Listado de errores del archivo de entrada " + " detectados por el analizador</p>\n" +
	"      </div>\n" +
	"    </div>\n" +
	"    <div class=\"row\">\n" +
	"    <table id=\"data\"  cellspacing=\"0\" style=\"width: 100 %\" class=\"table table-striped table-bordered table-sm\">\n" +
	"      <thead class=\"thead-dark\">\n" +
	"        <tr>\n" +
			  cadena2 +
	"        </tr>\n" +
	"      </thead>" +
	"<tbody>";

	var body2 = "</tbody>\n" +
	"    </table>\n" +
	"</div>\n" +
	"  </div>";

	var script =
		 "  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js\" ></script>\n" +
		 "  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script>\n" +
		 "  <script src=\"https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js\"></script>\n" +
		 "  <script src=\"https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js\" ></script>\n" +
		 "<script>" +
		 "$(document).ready(function () { " +
		  "$('#data').DataTable(" +

		  "{ \"aLengthMenu\" " + ":" + " [[5, 10, 25, -1], [5, 10, 25, \"All\"]], \"iDisplayLength\" : 5" +
		  "}" +
		  ");" +
		  "}" +
		  "); " +
		"</script>";

	var cadena = ""
	for i, s := range arrayLexico {
		a := strconv.Itoa(i)
		cadena = cadena + "<tr>\n" +
		"     <th scope=\"row\">" + a + "</th>\n" +
		"     <td>" + s + "</td>\n" +
		"</tr>"
	}
	
	//ESCRIBE EN EL DOCUMENTO
	var html = head + body1 + cadena + body2 + script + "</body>" + "</html>";
	buf.WriteString(html)
	buf.Flush()
	file.Close()
	
	//SE HACE UNA LLAMADA A LA PAGINA NUEVAMENTE
	p := Page{ Tittle : "Proyecto 2", Text : textoActual, Console: textoConsola}
	temp, _ := template.ParseFiles("index.html")
	temp.Execute(w, p)
	
}

func indexHandler(w http.ResponseWriter, req *http.Request){
	p := Page{ Tittle : "Proyecto 2", Text : "", Console: ""}
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, p)
}

func main() {
	router := mux.NewRouter()
	
	//endpoints
	router.HandleFunc("/", indexHandler)
	router.HandleFunc("/analizar", EndPoint).Methods("POST")
	router.HandleFunc("/lexerror", GetError).Methods("GET")
	
	
	log.Fatal(http.ListenAndServe(":8080", router))
	
}