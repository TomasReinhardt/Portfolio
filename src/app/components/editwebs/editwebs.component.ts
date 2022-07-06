import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editwebs',
  templateUrl: './editwebs.component.html',
  styleUrls: ['./editwebs.component.css'],
  providers: [ UserService,DataService,UploadService]
})
export class EditwebsComponent implements OnInit {
  public Projects: Project[] = [];
  public Project: Project = {
    id: 0,
    name: "",
    description: "",
    caracteristicas: "",
    img: "",
    link_git: "",
    link_web: ""
  }
  public ProjectEdit: Project = {
    id: 0,
    name: "",
    description: "",
    caracteristicas: "",
    img: "",
    link_git: "",
    link_web: ""
  }
  public CaracteristicasProject: string[] = [];
  public ToolsProject: string[] = [];  
  public CaracteristicasProjectString: string = "";
  public ToolsProjectString: string = "";
  public loading:boolean = false;
  public files: File[] = [];
  typeProject: string = "";

  constructor(
    public _router: Router,
    private _UploadService: UploadService,
    private _DataService: DataService, 
    private _UserService: UserService 
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._DataService.getrPojects().subscribe(
      response => {
        this.Projects = response.result;
        $('.auxInfoP').hide();
      },
      err => {
        console.log("-------------------------");
        console.log(err.error.message);
        console.log("-------------------------");
      }
    )
  }

  assignProject(id:number) {
    this.Project = {
      id: 0,
      name: "",
      description: "",
      caracteristicas: "",
      img: "",
      link_git: "",
      link_web: ""
    }
    this.CaracteristicasProject = [];
    this.ToolsProject = [];
    this.typeProject = "";


    this.Project = this.Projects[id];
    let aux = this.Project.caracteristicas.split("///");

    let aux2 = aux[0].split("//");
    for (let i = 0; i < aux2.length; i++) {
      this.CaracteristicasProject.push(aux2[i]);
    }

    aux2 = aux[1].split("//");
    for (let i = 0; i < aux2.length; i++) {
      this.ToolsProject.push(aux2[i]);
    }

    aux = this.Project.description.split("//");

    this.Project.description = aux[1];
    this.typeProject = aux[0];

    $('.auxInfoP').fadeIn(300);
  }

  close() {
    $('.auxInfoP').fadeOut(300);
    this.Project.description = this.typeProject+"//"+this.Project.description;
  }

  hoverSVG(child:any) {
    $('.titleInfo').addClass('svgHover');
  }

  noHoverSVG(child:any) {
    $('.titleInfo').removeClass('svgHover');
  }

  assingProjectEdit(id:number){
    for (let i = 0; i < this.Projects.length; i++) {
      if(this.Projects[i].id == id){
        this.CaracteristicasProjectString = "";
        this.ToolsProjectString = "";
        this.ProjectEdit = this.Projects[i];

        let aux = this.ProjectEdit.caracteristicas.split("///");

        this.CaracteristicasProjectString = aux[0];
        this.ToolsProjectString = aux[1];

        break
      }
    }
    $('.auxInfoP').fadeOut(300);
  }

  addUpdateProject(form:any) {
    if(this.Project.id == 0){
      this.uploadImage("add")
    }else {
      this.uploadImage("update")
    }
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
          this.files = [];
          var aux = "https://res.cloudinary.com/dvq0ezqjl/image/upload/c_scale,h_640,w_640/v"+response.version+"/"+response.public_id+"."+response.format;
          if(action=="add"){
            this.addProject(aux);
          }else if(action=="update"){
            this.updateProject(aux);
          }
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
          this._UserService.checkToken(err.error.error)
        }
      )
    }else {
      if(action=="add"){
        this.addProject("");
      }else if(action=="update"){
        this.updateProject(this.Project.img)
      }
    }
      
  }

  addProject(img:string) {
    this.ProjectEdit.img = img;
    this.ProjectEdit.caracteristicas = this.CaracteristicasProjectString+"///"+this.ToolsProjectString;
    this._DataService.addProject(this.ProjectEdit).subscribe(
      response => {
        this.getProjects();
        this.ProjectEdit  = {
          id: 0,
          name: "",
          description: "",
          caracteristicas: "",
          img: "",
          link_git: "",
          link_web: ""
        }
        this.CaracteristicasProjectString = "";
        this.ToolsProjectString = "";
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }

  updateProject(img:string) {
    this.ProjectEdit.img = img;
    this.ProjectEdit.caracteristicas = this.CaracteristicasProjectString+"///"+this.ToolsProjectString;
    this._DataService.updateProject(this.ProjectEdit).subscribe(
      response => {
        this.getProjects();
        this.ProjectEdit  = {
          id: 0,
          name: "",
          description: "",
          caracteristicas: "",
          img: "",
          link_git: "",
          link_web: ""
        }
        this.CaracteristicasProjectString = "";
        this.ToolsProjectString = "";
        this.loading = false;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }

  onSelect(event:any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.files.splice(0, 1);
    }
    if (this.files[0].type != "image/jpeg" && this.files[0].type != "image/png" && this.files[0].type != "image/jpg"){
      this.files.splice(this.files.indexOf(event), 1);
      alert('Tipo de archivo no soportado')
    }
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
