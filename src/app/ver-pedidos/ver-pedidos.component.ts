import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../menu/interfaces/platillos';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss']
})
export class VerPedidosComponent implements OnInit {
  pedidoAlmuerzo:Pedido[] = [];
  validacionP!:boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigateByUrl('menu');
  }

  vaciar(){
    localStorage.removeItem('pedido');
    localStorage.removeItem('platoNum');
    this.pedidoAlmuerzo =[];
    this.validacionP=false;
  }
}
