import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPedidosRoutingModule } from './ver-pedidos-routing.module';
import { VerPedidosComponent } from './ver-pedidos.component';
import { DireccionComponent } from './components/direccion/direccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaPlatillosComponent } from './components/lista-platillos/lista-platillos.component';
import { ResumenOrdenComponent } from './components/resumen-orden/resumen-orden.component';


@NgModule({
  declarations: [
    VerPedidosComponent,
    DireccionComponent,
    ListaPlatillosComponent,
    ResumenOrdenComponent
  ],
  imports: [
    CommonModule,
    VerPedidosRoutingModule,
    ReactiveFormsModule
  ]
})
export class VerPedidosModule { }
