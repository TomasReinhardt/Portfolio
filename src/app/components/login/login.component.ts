import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public User = {username:"",password:""}
  public ErrorUser: string = "";
  public loading = true;


  constructor(
    private _UserService:UserService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.checkApi();
  }

  checkUser(formLogin: any){
    this._UserService.singUp(this.User).subscribe(
      response => {
        sessionStorage.setItem('token',response.token);
        sessionStorage.setItem('user',response.user);
        formLogin.reset();
      },
      err => {
        console.log("-------------------------");
        console.log(err.error.message);
        console.log("-------------------------");
        this.ErrorUser = err.error.message;
      }
    )
  }

  ngDoCheck(){
    if(this._UserService.loggedIn()) {
      this._router.navigate(['edit']);
    }
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
