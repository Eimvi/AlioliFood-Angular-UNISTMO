import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Food, Pedido } from '../../interfaces/platillos';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.scss']
})
export class PlatillosComponent implements OnInit {
  @Input() list:Food[] = [];
  @Output() enviarPedido: EventEmitter<Food>=new EventEmitter;
  @Output() restarPedido: EventEmitter<Food>=new EventEmitter;

  plato:number[]=[]
  auxPlato!:string|null;

  constructor(private food:MenuService) { }

  ngOnInit(): void {
    this.auxPlato = localStorage.getItem('platoNum')
    this.plato =  this.auxPlato !== null ? JSON.parse(this.auxPlato) : [];
  }

  agregar(item:Food, id:number){
    this.auxPlato = localStorage.getItem('platoNum')
    this.plato =  this.auxPlato !== null ? JSON.parse(this.auxPlato) : [];

    if(this.plato[id]==null){
      this.plato[id]=0;
    }
    this.plato[id]++;
    this.food.actualizarPedido('platoNum',this.plato);
    this.enviarPedido.emit(item)

  }

  eliminar(item:Food, id:number){
    this.auxPlato = localStorage.getItem('platoNum')
    this.plato =  this.auxPlato !== null ? JSON.parse(this.auxPlato) : [];

    this.plato[id]--;

    this.food.actualizarPedido('platoNum',this.plato);
    this.restarPedido.emit(item)
  }
}
