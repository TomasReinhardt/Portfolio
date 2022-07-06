import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-icicio',
  templateUrl: './edit-icicio.component.html',
  styleUrls: ['./edit-icicio.component.css'],
  providers: [DataService,UploadService,UserService]
})
export class EditIcicioComponent implements OnInit {
  public  = false;
  public loading = false;
  public files: File[] = [];
  public descriptionPerfil:string = "";
  public CVlink:string = "";
  public perfilLink:string = "";
  public icons:any[] = [];
  public nameIcon: string = "";
  public typeImg = "";
  constructor(
    private _DataService: DataService,
    private _UploadService: UploadService,
    private _UserService: UserService
    ) { }

  ngOnInit(): void {
    this.getImgs();
  }

  onSelect(event:any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.files.splice(0, 1);
    }
    if (this.files[0].type != "application/pdf" && this.files[0].type != "image/jpeg" && this.files[0].type != "image/png" && this.files[0].type != "image/jpg"){
      this.files.splice(this.files.indexOf(event), 1);
      alert('Tipo de archivo no soportado')
    }
    if(this.files[0].type == 'application/pdf'){
      this.typeImg = this.files[0].type;
    }
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.typeImg = "";
  }

  getImgs(){
    this._DataService.getImg().subscribe(
      response => {
        for (let i = 0; i < response.result.length; i++) {        
          if(response.result[i].name == "description"){
            this.descriptionPerfil = response.result[i].link;
          }
          if(response.result[i].name == "CV"){
            this.CVlink = response.result[i].link;
          }
          if(response.result[i].name == "perfil"){
            this.perfilLink = response.result[i].link;
          }
          if(response.result[i].name.includes("icon")){
            var aux = {
              id: response.result[i].id,
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

  deleteTool(i:number) {
    this.loading = true;
    this._DataService.deleteTool(this.icons[i].id).subscribe(
      response => {
        this.icons.splice(i,1);
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  uploadImage(action:string){
    this.loading = true;
    if(this.files.length >= 1){
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'portafolio_cloudinary');
      data.append('cloud_name', 'dvq0ezqjl');
      this._UploadService.uploadImage(data).subscribe(
        response => {
          var aux = "https://res.cloudinary.com/dvq0ezqjl/image/upload/c_scale,h_640,w_640/v"+response.version+"/"+response.public_id+"."+response.format;
          if(action == "perfil"){
            this.updatePerfil(aux);
          } else if(action == "info"){
              this.updateInfo(aux);
            } else if (action == "tool"){
                this.addTool(aux);
              }
        },
        err => {
          console.log(err);
          this._UserService.checkToken(err.error.error)
        }
      )
    } else {
      if(action == "perfil"){
        alert("no cargo imagen");
        this.loading = false;
      } else if(action == "info"){
          this.updateInfo(this.CVlink);
        } else if(action == "tool"){
          alert("no cargo imagen");
          this.loading = false;
      }
    }
  }

  addTool(img:string):void  {
    let tool = {
      name: "icon"+this.nameIcon,
      link: img
    }
    this._DataService.addTool(tool).subscribe(
      response => {
        let toolAux = {
          id: response.result,
          name: "icon"+this.nameIcon,
          link: img
        }
        this.icons.push(toolAux);
        this.nameIcon = "";
        this.files = [];
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  updateInfo(img:string):void {
    let tool = {
      id: 2,
      link: this.descriptionPerfil
    }
    this._DataService.updateImg(tool).subscribe(
      response => {
        let tool = {
          id: 3,
          link: img
        }
      
        this._DataService.updateImg(tool).subscribe(
          response => {
            this.files = [];
            this.descriptionPerfil = "";
            this.loading = false;
          },
          err => {
            console.log("-------------------------");
            console.log(err);
            console.log("-------------------------");
            this._UserService.checkToken(err.error.error)
          }
        )

      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  updatePerfil(img:string):void {
    let tool = {
      id: 1,
      link: img
    }
    this._DataService.updateImg(tool).subscribe(
      response => {
        this.files = [];
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
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
