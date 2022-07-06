import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.css'],
  providers: [UserService]
})
export class NormalComponent implements OnInit {
  public loading = true;
  constructor(
    private _router: Router,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.checkApi();
  }

  addActive(id:string) {
    $('.menuBu').removeClass("activo");
    $('#'+id).addClass('activo');
    
  }

  checkApi(){
    this._UserService.checkApi().subscribe(
      respones => {
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err.error.message);
        console.log("-------------------------");
      }
    )
  }
}
