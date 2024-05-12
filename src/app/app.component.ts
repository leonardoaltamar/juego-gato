import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'juego-gato';
  playerOne: boolean = true;
  win: boolean = false;
  start: boolean = false;

  useSelect(coordinates:string){
    this.start = true;
    console.log(coordinates)
    const element:any = document.getElementById(coordinates);
    if(!this.win && !element.innerHTML){

      element.innerHTML = this.playerOne ? 'X' : 'O';
      this.playerOne = !this.playerOne;

      /* 
        posiciones a evaluar
          horizontales
            1_1, 1_2, 1_3
            2_1, 2_2, 3_3
            3_1, 3_2, 3_3
          verticales
            1_1, 2_1, 3_1
            1_2, 2_2, 3_2
            1_3, 2_3, 3_3
          diagonal
            1_1 2_2 3_3
            1_3 2_2 3_1
      */

      if(this.compareHorizontal() || this.compareVerticales() || this.compareDiagonales()){
        this.win = true;
        return
      }
      
    }    
    
  }


  compareHorizontal(): boolean{
    return (this.compareCell('1_1', '1_2', '1_3') || this.compareCell('2_1', '2_2', '2_3') || this.compareCell('3_1', '3_2', '3_3'))
  }

  compareVerticales(): boolean{
    return (this.compareCell('1_1', '2_1', '3_1') || this.compareCell('1_2', '2_2', '3_2') || this.compareCell('1_3', '2_3', '3_3'))
  }

  compareDiagonales(): boolean{
    return (this.compareCell('1_1', '2_2', '3_3') || this.compareCell('1_3', '2_2', '3_1'))
  }

  compareCell(c1:string,c2:string,c3:string): boolean{
    const c1DOM = document.getElementById(c1)
    const c2DOM = document.getElementById(c2)
    const c3DOM = document.getElementById(c3)

    if(c1DOM?.innerHTML && c2DOM?.innerHTML && c3DOM?.innerHTML){
      if(c1DOM?.innerHTML == c2DOM?.innerHTML && c1DOM?.innerHTML == c3DOM?.innerHTML){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }


  }

  reset(){
    ['1_1', '1_2', '1_3', '2_1', '2_2', '2_3', '3_1', '3_2', '3_3'].forEach( (cell:string) => {
      const cellDOM:any = document.getElementById(cell);
      cellDOM.innerHTML = null
    });
    this.start = false;
    this.win = false;
  }


}
