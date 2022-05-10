import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';

import { Category } from '../../interfaces/categoria';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  cate:boolean[]= [true, true, true];

  @Input()
  list:Category[] = [];

  @Output()
  enviartodo: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor(private category:MenuService) { }

  ngOnInit(): void {
  }

  todos(){
    this.enviartodo.emit(this.cate);
  }

  opcionCategoria(id:number){
    switch(id){
      case 0:
          this.cate=[true,true,true];
      break;
      case 1:
          this.cate=[true,false,false];
      break;
      case 2:
          this.cate=[false,true,false];
      break;
      case 3:
          this.cate=[false,false,true];
      break;
    }

    this.enviartodo.emit(this.cate);

  }

}
