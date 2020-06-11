import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'List';
  recipeName:string='';
  recipes=[];

  onAdd(){
    this.recipes.push(this.recipeName);
    this.recipeName='';
  }

  onRemove(name){
   var index=this.recipes.indexOf(name);
   if(index>-1){
     this.recipes.splice(index,1);
   }
  }


  onRemoveAll(){
    // var i:number=0;
    // while(i<this.recipes.length){
    //   if(this.recipes[i]===this.recipeName){
    //     this.recipes.splice(i,1);
    //   }else{
    //     ++i;
    //   }
    // }

    this.recipes=[];
  
  }


  clear(){
    this.recipeName='';
  }
}
