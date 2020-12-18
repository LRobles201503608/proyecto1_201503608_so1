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
pids:any=[];
nombres:any=[];
usuarios:any=[];
estado:any=[];
pidsh:any=[];
nombresh:any=[];
usuariosh:any=[];
estadoh:any=[];
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
          if(charActual=="{"){
            estado=1
          }
          break;
        }
        case 1:{
          if(charActual=="{"||charActual=="\""||charActual=="\t"||charActual=="\n"||charActual==" "){

          }else if(charActual=="}"){
            estado=0; 
          }else if(charActual==":"){
            estado=2;
          }else{
            palabra+=charActual;
          }
          break;
        }
        case 2:{
          if(palabra=="hijo"){
            estado=3;
          }
          if(charActual=="{"||charActual=="\""||charActual=="\t"||charActual=="\n"||charActual==" "){

          }
          if(charActual==","){
            estado=1;
            if(palabra=="pid"){
              this.pids.push(resultado);
            }else if(palabra=="nombre"){
              this.nombres.push(resultado);
            }else if(palabra=="usuario"){
              this.usuarios.push(resultado);
            }else if(palabra=="estado"){
              this.estado.push(resultado);
            }
            resultado="";
            palabra="";
          }else{
            resultado+=charActual
          }
          break;
        }
        case 3:{
          if(charActual==","||charActual=="["||charActual=="\""||charActual=="\t"||charActual=="\n"||charActual==" "){

          }
          if(charActual=="{"){
            estado=4
          }
          else if(charActual=="]"){
            estado=1;
          }
          break;
        }
        case 4:{
          if(charActual=="{"||charActual=="\""||charActual=="\t"||charActual=="\n"||charActual==" "){

          }else if(charActual=="}"){
            estado=3; 
          }else if(charActual==":"){
            estado=5;
          }else{
            palabra+=charActual;
          }
          break;
        }
        case 5:{
          if(charActual=="{"||charActual=="\""||charActual=="\t"||charActual=="\n"||charActual==" "){

          }
          if(charActual==","){
            estado=4;
            if(palabra=="pid"){
              this.pidsh.push(resultado);
            }else if(palabra=="nombre"){
              this.nombresh.push(resultado);
            }else if(palabra=="usuario"){
              this.usuariosh.push(resultado);
            }else if(palabra=="estado"){
              this.estadoh.push(resultado);
            }
            resultado="";
            palabra="";
          }else{
            resultado+=charActual
          }
          break;
        }
      }
    }
    console.log(this.nombresh);
    console.log(this.usuariosh);
    console.log(this.estadoh);
    this.llenarTablas();
  }
  llenarTablas(){
    let filas_e = "";
    let tbl2 = document.getElementById("padres");
    for(let a=0;a<this.nombres.length;a++){
      filas_e += "<td>"+this.nombres[a]+"</td>"+"<td>"+this.usuarios[a]+"</td>"+"<td>"+this.estado[a]+"</td>"+"</tr>";
    }
    tbl2.innerHTML = filas_e;
    filas_e="";
    let tbl2h = document.getElementById("hijos");
    for(let a=0;a<this.nombresh.length;a++){
      filas_e += "<td>"+this.nombresh[a]+"</td>"+"<td>"+this.usuariosh[a]+"</td>"+"<td>"+this.estadoh[a]+"</td>"+"</tr>";
    }
    tbl2h.innerHTML=filas_e;
  }
}
