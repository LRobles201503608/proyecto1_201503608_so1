import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ChartsModule} from 'ng2-charts';

import { CpuComponent } from './components/cpu/cpu.component';
import { RamComponent } from './components/ram/ram.component';
import { Ram2Component } from './ram2/ram2.component'
import {HttpClientModule} from '@angular/common/http';
import { ProcesosComponent } from './components/procesos/procesos.component';
@NgModule({
  declarations: [
    AppComponent,
    CpuComponent,
    RamComponent,
    Ram2Component,
    ProcesosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
