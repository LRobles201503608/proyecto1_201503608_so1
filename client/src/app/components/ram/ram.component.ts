import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {RamService} from '../../services/ram.service'
@Component({ 
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit {
  daata:any=[];
  dato1:any=[];
  dato2:any=[];
  total:any;
  libre:any;
  usado:any;
  libremb:any;
  usadomb:any;

  public lineChartData: ChartDataSets[] = [
    { data: this.dato1, label: 'Informacion de la RAM' },
  ];
  public lineChartLabels: Label[] = this.dato1;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  constructor(public servicio:RamService) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.cargaDatos()
    },3000)  
  }
  cargaDatos(){
    this.servicio.GetValues().subscribe(
      res=>{
        //console.log(res);
        this.daata=res;
        this.modifData();
      },
      err=>{
        console.log(err);
      }
    );
    
  }

  modifData(){
    //console.log(this.daata.uso);
    this.libre=this.daata.libre;
    this.total=this.daata.total;
    this.usado=this.daata.uso;
    this.libremb=this.total*this.libre;
    this.usadomb=this.total*this.usado;
    console.log(this.libremb)
    this.dato1.push(this.daata.uso);
    if(this.dato1.length<9){

    }else{
      for(let a=1;a<this.dato1.length;a++){
        this.dato1[a-1]=this.dato1[a]
      }
      this.dato1.pop();
    }
    //console.log(this.dato1);
  }
}
