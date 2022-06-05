import { Component, OnInit } from '@angular/core';
import { Pedido } from '../menu/interfaces/platillos';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss']
})
export class VerPedidosComponent {
  pedidoAlmuerzo:Pedido[] = [];

  constructor() { }

  vaciar(){
    localStorage.removeItem('pedido');
    localStorage.removeItem('platoNum');
    this.pedidoAlmuerzo =[];
  }
}
