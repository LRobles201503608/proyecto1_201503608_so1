package main

import (
	"encoding/json"
	"net/http"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/mem"
	"github.com/gorilla/mux"
	"time"
	"fmt"
	"log"
)
type Ram struct {
	Total string `json:"total"`
	Libre string `json:"libre"`
	Uso string `json:"uso"` 
}

type Cpu struct{
	Nucleo1 string `json:"nucleo1"`
	Nucleo2 string `json:"nucleo2"`
	Nucleo3 string `json:"nucleo3"`
	Nucleo4 string `json:"nucleo4"`
	Libre1 string `json:"libre1"`
	Libre2 string `json:"libre2"`
	Libre3 string `json:"libre3"`
	Libre4 string `json:"libre4"`
}

func main(){
	
	//routes del servidor
	router := mux.NewRouter()
	router.HandleFunc("/",homeHandler)
	router.HandleFunc("/cpu",CPUHandler).Methods("GET")
	router.HandleFunc("/ram",RAMHandler).Methods("GET")
	//inicia el servidor
	log.Fatal(http.ListenAndServe(":3000",router))
	
}

func homeHandler(w http.ResponseWriter, r *http.Request){
	
	w.Write([]byte("****Juan Luis Robles Molina****\n****201503608*****\n*****curso sistemas operativos 1*****"))
}

func CPUHandler(w http.ResponseWriter, r *http.Request){
	enableCors(&w)
	percent, _ := cpu.Percent(time.Second,true)
	var nucleo1 = percent[0]
	var nucleo2 = percent[1]
	var nucleo3 = percent[2]
	var nucleo4 = percent[3]
	var libre1 = 100 -nucleo1
	var libre2= 100 - nucleo2
	var libre3 = 100 - nucleo3
	var libre4= 100 - nucleo4
	fmt.Printf("nucleo 1: %v, nucleo 2: %v, nucleo 3: %v, nucleo 4: %v\n",nucleo1,nucleo2,nucleo3,nucleo4)
	fmt.Printf("libre 1: %v, libre 2: %v, libre 3: %v, libre 4: %v\n",libre1,libre2,libre3,libre4)
	dato := Cpu{
		Nucleo1: fmt.Sprintf("%v",nucleo1),
		Nucleo2: fmt.Sprintf("%v",nucleo2),
		Nucleo3: fmt.Sprintf("%v",nucleo3),
		Nucleo4: fmt.Sprintf("%v",nucleo4),
		Libre1: fmt.Sprintf("%v",libre1),
		Libre2: fmt.Sprintf("%v",libre2),
		Libre3: fmt.Sprintf("%v",libre3),
		Libre4: fmt.Sprintf("%v",libre4),
	}
	b, err := json.MarshalIndent(dato, "", "  ")
	if err != nil {
		fmt.Println(err)
	}
	// valores en consola
	fmt.Print(string(b))
	json.NewEncoder(w).Encode(dato)
}
func RAMHandler(w http.ResponseWriter, r *http.Request){
	enableCors(&w)
	v, _ := mem.VirtualMemory()
	// almost every return value is a struct
	var total=v.Total/(1024*1024)
	var usedpercent=v.UsedPercent
	var freepercent=100-usedpercent
	datos := Ram{
		Total: fmt.Sprintf("%v",total),
		Libre: fmt.Sprintf("%f", freepercent),
		Uso: fmt.Sprintf("%f",usedpercent),
	}

	b, err := json.MarshalIndent(datos, "", "  ")
	if err != nil {
		fmt.Println(err)
	}
	// valores en consola
	fmt.Print(string(b))
	json.NewEncoder(w).Encode(datos)
	
}

func enableCors(w *http.ResponseWriter){
	(*w).Header().Set("Access-Control-Allow-Origin","*")
}