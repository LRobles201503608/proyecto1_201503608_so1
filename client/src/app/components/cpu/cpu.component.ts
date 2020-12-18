import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CpuService } from 'src/app/services/cpu.service';
@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  datos:any=[];
  ddaton1:any=[];
  ddaton2:any=[];
  ddaton3:any=[];
  ddaton4:any=[];

  dnucleo1:any;
  dnucleo2:any;
  dnucleo3:any;
  dnucleo4:any;
  lnucleo1:any;
  lnucleo2:any;
  lnucleo3:any;
  lnucleo4:any;
  public lineChartData: ChartDataSets[] = [
    { data: this.ddaton1, label: 'DATOS NUCLEO 1' },
  ];
  public lineChartLabels: Label[] = this.ddaton1;
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
  public lineChartData2: ChartDataSets[] = [
    { data: this.ddaton2, label: 'DATOS NUCLEO 2' },
  ];
  public lineChartLabels2: Label[] = this.ddaton2;
  public lineChartOptions2: ChartOptions = {
    responsive: true,
  };
  public lineChartData3: ChartDataSets[] = [
    { data: this.ddaton3, label: 'DATOS NUCLEO 3' },
  ];
  public lineChartLabels3: Label[] = this.ddaton3;
  public lineChartOptions3: ChartOptions = {
    responsive: true,
  };
  public lineChartData4: ChartDataSets[] = [
    { data: this.ddaton4, label: 'DATOS NUCLEO 4' },
  ];
  public lineChartLabels4: Label[] = this.ddaton4;
  public lineChartOptions4: ChartOptions = {
    responsive: true,
  };



  constructor(public servicio:CpuService) { }

  ngOnInit(): void {
    //console.log("holalaaa")
    setInterval(()=>{
      this.capturaDatos()
    },2700)  
    
  }

  capturaDatos(){
    this.servicio.GetValues().subscribe(
      res=>{
        //console.log(res);
        this.datos=res;
        this.modifDatos();
      },
      err=>{
        console.log(err);
      }
    );
  }
  modifDatos(){
    //console.log(this.datos.nucleo1);
    this.dnucleo1=this.datos.nucleo1;
    this.dnucleo2=this.datos.nucleo2;
    this.dnucleo3=this.datos.nucleo3;
    this.dnucleo4=this.datos.nucleo4;

    this.ddaton1.push(this.datos.nucleo1);
    this.ddaton2.push(this.datos.nucleo2);
    this.ddaton3.push(this.datos.nucleo3);
    this.ddaton4.push(this.datos.nucleo4);
    if(this.ddaton1.length<9){

    }else{
      for(let a=1;a<this.ddaton1.length;a++){
        this.ddaton1[a-1]=this.ddaton1[a]
        this.ddaton2[a-1]=this.ddaton2[a]
        this.ddaton3[a-1]=this.ddaton3[a]
        this.ddaton4[a-1]=this.ddaton4[a]
      }
      this.ddaton1.pop();
      this.ddaton2.pop();
      this.ddaton3.pop();
      this.ddaton4.pop();
    }
  }
}
