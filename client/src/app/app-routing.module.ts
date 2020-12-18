import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CpuComponent} from './components/cpu/cpu.component'
import {RamComponent}from './components/ram/ram.component'
import {Ram2Component} from './ram2/ram2.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cpu',
    pathMatch:'full'
  },
  {
    path:'cpu',
    component:CpuComponent
  },
  {
    path:'ram',
    component:RamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
