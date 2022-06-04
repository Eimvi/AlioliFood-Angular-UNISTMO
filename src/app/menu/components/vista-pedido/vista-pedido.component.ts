import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from '../../../menu/interfaces/platillos';

@Component({
  selector: 'app-vista-pedido',
  templateUrl: './vista-pedido.component.html',
  styleUrls: ['./vista-pedido.component.scss']
})
export class VistaPedidoComponent implements OnInit {
  pedidoAlmuerzo: Pedido[]=[];
  auxPedido!: string|null;

  @Input() sumPlatos:number=0;
  @Input() sumTotal:number=0;

  constructor() { }

  ngOnInit(): void {

    this.auxPedido = localStorage.getItem('pedido');
    console.log(this.auxPedido);
    this.pedidoAlmuerzo=this.auxPedido !== null ? JSON.parse(this.auxPedido):[];
    this.sumPlatos=0;
    this.sumTotal=0;
    for(let i=0; i<this.pedidoAlmuerzo.length;i++ ){
      this.sumTotal+=this.pedidoAlmuerzo[i].price * this.pedidoAlmuerzo[i].cantidad;
      this.sumPlatos+=this.pedidoAlmuerzo[i].cantidad;
    }
  }

}
