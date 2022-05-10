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

  pedidoAlmuerzo:Pedido[]=[];

  constructor(private router: Router, private authService:AuthService, private menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.getFood().subscribe(
      resp => {
        this.foods = resp;
        this.clasificar(this.foods);
      }
    );

    this.menuService.getCategory().subscribe(
      resp => {
        this.categories = resp;
      }
    );

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
      let food = this.pedidoAlmuerzo[id].cantidad++;
    }
  }

  pedidoRestar(item2:Food){
    const id = this.pedidoAlmuerzo.findIndex(item=>{
      return item.id == item2.id
    })
    let food = this.pedidoAlmuerzo[id].cantidad--;
  }

  logout(): void{
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  verpedidos(): void{
    this.menuService.guardarPlatillos(this.pedidoAlmuerzo);
    this.router.navigateByUrl('ver-orden');
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
