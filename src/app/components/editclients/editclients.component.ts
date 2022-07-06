import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studie } from 'src/app/models/studie';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editclients',
  templateUrl: './editclients.component.html',
  styleUrls: ['./editclients.component.css'],
  providers: [DataService,UserService]
})
export class EditclientsComponent implements OnInit {
  public loading = false;
  public Studies: Studie[] = [];
  public Studie: Studie = {
    id: 0,
    name: "",
    state: "",
    institucion: "",
    type: "",
    linkInstitucion: ""
  };

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
        console.log(this.Studies);
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
   }

  addUpdateStudie(form:any) {
    this.loading = true;
    if(this.Studie.id == 0){

      let studieAux= {
        name: this.Studie.name,
        state: this.Studie.state,
        institucion: this.Studie.institucion,
        type: this.Studie.type,
        linkInstitucion: this.Studie.linkInstitucion
      }

      this._DataService.addStudies(studieAux).subscribe(
        response => {
          this.loading = false;
          this.Studie = {
            id: 0,
            name: "",
            state: "",
            institucion: "",
            type: "",
            linkInstitucion: ""
          };
          this.getStudies();
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
          this._UserService.checkToken(err.error.error); 
        }
      )

    }else {
      this._DataService.updateStudies(this.Studie).subscribe(
        response => {
          this.loading = false;
          this.Studie = {
            id: 0,
            name: "",
            state: "",
            institucion: "",
            type: "",
            linkInstitucion: ""
          };
          this.getStudies();
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
          this._UserService.checkToken(err.error.error); 
        }
      )
    }
  }

  editStudie(i:number) {
    this.Studie = this.Studies[i];
  }

  deleteStudie(i:number) {
    this.Studie = this.Studies[i];

    let aux = confirm("Eliminar "+this.Studies[i].name+" ?");

    if(aux){
      this.loading = true;
      this._DataService.deleteStudies(this.Studies[i].id).subscribe(
        response => {
          this.Studies.splice(i,1);
          this.loading = false;

        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
          this._UserService.checkToken(err.error.error); 
        }
      )
    }

  }

}
