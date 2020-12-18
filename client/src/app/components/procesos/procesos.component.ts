import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {

  constructor(public servicio:ProcesosService) { }
data:any=[];
  ngOnInit(): void {
    this.obtenerDatos();
  }
  obtenerDatos(){
    this.servicio.GetValues().subscribe(
      res=>{
        this.data=res;
        this.Analizar();
      },
      err=>{
        console.log(err);
      }
    );
  }
  Analizar(){
    let estado=0;
    let posActual=0;
    let charActual='';
    let palabra="";
    let resultado="";
    let asciiActual=0;
    let cadena=this.data;
    asciiActual=cadena.charCodeAt(0);
    console.log(cadena)
    for(let actual=0;actual<cadena.length;actual++){
      charActual=cadena.charAt(actual);
      asciiActual=cadena.charCodeAt(actual);
      switch(estado){
        case 0:{
          break;
        }
        case 1:{
          break;
        }
        case 2:{
          break;
        }
      }
    }
  }
}
