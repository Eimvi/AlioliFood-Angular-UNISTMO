import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Food, Pedido } from './interfaces/platillos';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  foods:Food[]=[];
  almuerzo:Food[]=[];
  entrada:Food[]=[];
  postre:Food[]=[];
  catego:String = 'todos';

  pedidoAlmuerzo:Pedido[]=[];
  auxPedido!:string|null;

  constructor(private food:MenuService ) { }

  ngOnInit(): void {
    this.food.getFood().subscribe(
      resp => {
        this.foods = resp;
        this.clasificar(this.foods);
        this.auxPedido = localStorage.getItem('pedido')
        this.pedidoAlmuerzo =  this.auxPedido !== null ? JSON.parse(this.auxPedido) : [];
      }
    );

    this.auxPedido = localStorage.getItem('pedido')
    this.pedidoAlmuerzo =  this.auxPedido !== null ? JSON.parse(this.auxPedido) : [];
  }

  clasificar(food:Food[]):void{
    food.forEach((e)=>{
      switch (e.category.id){
        case 1:
          this.almuerzo.push(e)
        break;
        case 2:
          this.entrada.push(e);
        break;
        case 3:
          this.postre.push(e);
        break;
      }
    })
  }

  obtenerPedido(item2:Food){
    const id = this.pedidoAlmuerzo.findIndex(item=>{
      return item.id == item2.id
    })
    if(id == -1){
      const food2:Pedido={
        id: item2.id,
        title: item2.title,
        price: item2.price,
        image_url: item2.image_url,
        cantidad: 1
      }
      this.pedidoAlmuerzo.push(food2)
    }else{
      this.pedidoAlmuerzo[id].cantidad++;

    }
    this.food.actualizarPedido('pedido',this.pedidoAlmuerzo);
  }

  pedidoRestar(item2:Food){
    const id = this.pedidoAlmuerzo.findIndex(item=>{
      return item.id == item2.id
    })
    this.pedidoAlmuerzo[id].cantidad--;

    if( this.pedidoAlmuerzo[id].cantidad==0){
      this.pedidoAlmuerzo  = this.pedidoAlmuerzo.filter((item) => item.cantidad !== 0);
    }
    this.food.actualizarPedido('pedido',this.pedidoAlmuerzo);
  }

}
