import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoExitosoComponent } from './pedido-exitoso.component';

const routes: Routes = [{ path: '', component: PedidoExitosoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoExitosoRoutingModule { }
