import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';

import { MenuComponent } from './menu.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { VistaPedidoComponent } from './components/vista-pedido/vista-pedido.component';


@NgModule({
  declarations: [
    MenuComponent,
    PlatillosComponent,
    CategoriaComponent,
    VistaPedidoComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
