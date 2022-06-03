import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoExitosoRoutingModule } from './pedido-exitoso-routing.module';
import { PedidoExitosoComponent } from './pedido-exitoso.component';


@NgModule({
  declarations: [
    PedidoExitosoComponent
  ],
  imports: [
    CommonModule,
    PedidoExitosoRoutingModule
  ]
})
export class PedidoExitosoModule { }
