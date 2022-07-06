import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studie } from 'src/app/models/studie';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-webs-clients',
  templateUrl: './webs-clients.component.html',
  styleUrls: ['./webs-clients.component.css'],
  providers: [DataService,UserService]
})
export class WebsClientsComponent implements OnInit {

  public Studies: Studie[] = [];

  constructor(
    public _router: Router,
    private _DataService: DataService, 
    private _UserService: UserService 
  ) { }

  ngOnInit(): void {
    this.getStudies();
  }

 getStudies():void {
  this._DataService.getStudies().subscribe(
    response => {
      this.Studies = response.result;
    },
    err => {
      console.log("-------------------------");
      console.log(err);
      console.log("-------------------------");
    }
  )
 }

}
