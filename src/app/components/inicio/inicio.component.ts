import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [DataService]
})
export class InicioComponent implements OnInit {
  public imgPerfil:string = "";
  public descriptionPerfil:string = "";
  public CV:string = "";
  public icons:any[] = [];
  
  @Inject(DOCUMENT) document: any

  constructor(
    private _DataService: DataService
  ) { }

  ngOnInit(): void {
    this.getImgs();
  }


  getImgs():void {
    this._DataService.getImg().subscribe(
      response => {
        for (let i = 0; i < response.result.length; i++) {
          if(response.result[i].name == "perfil"){
            this.imgPerfil = response.result[i].link;
          }          
          if(response.result[i].name == "description"){
            this.descriptionPerfil = response.result[i].link;
          }
          if(response.result[i].name == "CV"){
            this.CV = response.result[i].link;
          }
          if(response.result[i].name.includes("icon")){
            var aux = {
              name: response.result[i].name.slice(4),
              link: response.result[i].link
            }
            this.icons.push(aux);
          }
        }
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }
}
