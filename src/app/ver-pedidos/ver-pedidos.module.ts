import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPedidosRoutingModule } from './ver-pedidos-routing.module';
import { VerPedidosComponent } from './ver-pedidos.component';
import { DireccionComponent } from './components/direccion/direccion.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerPedidosComponent,
    DireccionComponent,
    PedidoComponent
  ],
  imports: [
    CommonModule,
    VerPedidosRoutingModule,
    ReactiveFormsModule
  ]
})
export class VerPedidosModule { }
