

import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Food} from './interfaces/platillos';

import { Category } from './interfaces/categoria';

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

  /*cate1:boolean=false;
  cate2:boolean=false;
  cate3:boolean=false;*/

  catego:boolean[]= [true, true, true];

  constructor(private food:MenuService, private category:MenuService ) { }

  ngOnInit(): void {
    this.food.getFood().subscribe(
      resp => {
        console.log(resp)
        this.foods = resp;
        this.clasificar(this.foods);
        console.log(this.almuerzo)
        console.log(this.entrada)
        console.log(this.postre)
      }
    );

    this.category.getCategory().subscribe(
      resp => {
        console.log(resp)
        this.categories = resp;
      }
    );
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


  enviartodos(cate:boolean[]){
    this.catego=cate;
  }

  //todos1(){
  //  this.cate1=true;
   // this.cate2=false;
   // this.cate3=false;
 // }
}
