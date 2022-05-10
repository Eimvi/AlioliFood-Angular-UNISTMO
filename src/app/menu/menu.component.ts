import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { MenuService } from './services/menu.service';

import { Category } from './interfaces/categoria';
import { Food} from './interfaces/platillos';


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
  
  pedidoAlmuerzo:Pedido[]=[];

  catego:string='todos';

  constructor(private router: Router, private authService:AuthService, private menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.getFood().subscribe(
      resp => {
        this.foods = resp;
        this.clasificar(this.foods);
      }
    );

    this.category.getCategory().subscribe(
      resp => {
        this.categories = resp;
      }
    );
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

  enviartodos(cate:string): void{
    this.catego=cate;
  }
}
