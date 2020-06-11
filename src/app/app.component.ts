import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'components';
  recipeName:string='';
  recipes=[];

  onAdd(){
    this.recipes.push(this.recipeName)
  }

  onRemove(){
   var i=0;
   while(i<this.recipes.length){
     if(this.recipes[i]===this.recipeName){
       this.recipes.splice(i,1);
     }else{
       ++i;
     }
   }
  }
}
