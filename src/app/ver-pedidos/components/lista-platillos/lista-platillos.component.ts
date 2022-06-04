import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Pedido } from 'src/app/menu/interfaces/platillos';
import { MenuService } from '../../../menu/services/menu.service';

@Component({
  selector: 'app-lista-platillos',
  templateUrl: './lista-platillos.component.html',
  styleUrls: ['./lista-platillos.component.scss']
})
export class ListaPlatillosComponent implements OnInit {

  constructor(private menuService:MenuService) { }
  @Input() pedidoOrdenado:Pedido[]=[];
  @Output() enviarOrden: EventEmitter<Pedido[]>=new EventEmitter;

  auxOrden!:string|null;
  cantidadFood:number[]=[];

  ngOnInit(): void {
    this.pedidoOrdenado = this.recuperarOrden('pedido')
    this.cantidadFood =  this.recuperarCantidad('pedidoNum')
  }

  sumarOrden(item2:Pedido, id:number){
    this.pedidoOrdenado = this.recuperarOrden('pedido')
    const id2 = this.pedidoOrdenado.findIndex(item=>{
      return item.id == item2.id
    })
    this.pedidoOrdenado[id2].cantidad++;
    this.menuService.actualizarPedido('pedido',this.pedidoOrdenado);

    this.cantidadFood =  this.recuperarCantidad('pedidoNum')
    this.cantidadFood[id]++;
    this.menuService.actualizarPedido('platoNum',this.cantidadFood);

    this.enviarOrden.emit(this.pedidoOrdenado)
  }

  restarOrden(item2:Pedido, id:number){
    this.pedidoOrdenado = this.recuperarOrden('pedido')
    const id2 = this.pedidoOrdenado.findIndex(item=>{
      return item.id == item2.id
    })
    this.pedidoOrdenado[id2].cantidad--;
    this.menuService.actualizarPedido('pedido',this.pedidoOrdenado);

    this.cantidadFood =  this.recuperarCantidad('pedidoNum')
    this.cantidadFood[id]--;
    this.menuService.actualizarPedido('platoNum',this.cantidadFood);

    this.enviarOrden.emit(this.pedidoOrdenado)
  }

  eleminarOrden(id:number){
    this.pedidoOrdenado = this.recuperarOrden('pedido')
    this.pedidoOrdenado  = this.pedidoOrdenado.filter((item) => item.id !== id);
    this.menuService.actualizarPedido('pedido',this.pedidoOrdenado);

    this.cantidadFood =  this.recuperarCantidad('pedidoNum')
    this.cantidadFood[id]=0;
    this.menuService.actualizarPedido('platoNum',this.cantidadFood);

    this.enviarOrden.emit(this.pedidoOrdenado)
  }

  recuperarOrden(clave:string):Pedido[]{
    this.auxOrden = localStorage.getItem(clave)
    return this.auxOrden !== null ? JSON.parse(this.auxOrden) : [];
  }

  recuperarCantidad(clave:string):number[]{
    this.auxOrden = localStorage.getItem('platoNum')
    return this.auxOrden !== null ? JSON.parse(this.auxOrden) : [];
  }
}
