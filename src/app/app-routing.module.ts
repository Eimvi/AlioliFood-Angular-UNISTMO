import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
  },
  { path: 'verpedidos', loadChildren: () => import('./ver-pedidos/ver-pedidos.module').then(m => m.VerPedidosModule) },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: 'pedido_exitoso', loadChildren: () => import('./pedido-exitoso/pedido-exitoso.module').then(m => m.PedidoExitosoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
