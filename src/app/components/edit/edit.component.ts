import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService]
})
export class EditComponent implements OnInit {
  public loading = true;

  constructor(
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.checkApi();
    var link = window.location.pathname.split('/');
    var client = link.includes('clients');
    var web = link.includes('webs');
    if( client || web ){
      if(client){
          $('#item1').removeClass('active');
          $('#item2').addClass('active');
          $('.menuBu').removeClass("activo");
          $('#menu2').addClass('activo')
       }
    }
  }

  addActive(id:string) {
    $('.menuBu').removeClass("activo");
    $('#'+id).addClass('activo')
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

  logOut() {
    this._UserService.logOut();
  }
}
