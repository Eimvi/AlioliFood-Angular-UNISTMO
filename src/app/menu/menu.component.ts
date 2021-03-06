import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { MenuService } from './services/menu.service';

import { Category } from './interfaces/categoria';
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
  categories:Category[]=[];
  catego:string = 'todos';
  numTotal:number[]=[];

  pedidoAlmuerzo:Pedido[]=[];
  auxPedido!:string|null;

  constructor(private router: Router, private authService:AuthService, private menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.getFood().subscribe(
      resp => {
        this.foods = resp;
        this.clasificar(this.foods);
      }
    );

    this.auxPedido = localStorage.getItem('pedido')
    this.pedidoAlmuerzo =  this.auxPedido !== null ? JSON.parse(this.auxPedido) : [];

    this.menuService.getCategory().subscribe(
      resp => {
        this.categories = resp;
      }
    );
    this.numTotal=this.menuService.getTotal(this.pedidoAlmuerzo);
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
    this.menuService.actualizarPedido('pedido',this.pedidoAlmuerzo);

    this.numTotal=this.menuService.getTotal(this.pedidoAlmuerzo);
    
  }

  pedidoRestar(item2:Food){
    const id = this.pedidoAlmuerzo.findIndex(item=>{
      return item.id == item2.id
    })
    this.pedidoAlmuerzo[id].cantidad--;

    if( this.pedidoAlmuerzo[id].cantidad==0){
      this.pedidoAlmuerzo  = this.pedidoAlmuerzo.filter((item) => item.cantidad !== 0);
    }
    this.menuService.actualizarPedido('pedido',this.pedidoAlmuerzo);
    this.numTotal=this.menuService.getTotal(this.pedidoAlmuerzo);
  }

  logout(): void{
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  verpedidos(): void{
    this.menuService.guardarPlatillos(this.pedidoAlmuerzo);
    this.router.navigateByUrl('verpedidos');
  }

  clasificar(food:Food[]): void{
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

  enviarTodos(cate:string): void{
    this.catego=cate;
  }
}
