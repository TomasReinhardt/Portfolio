import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-webs-ej',
  templateUrl: './webs-ej.component.html',
  styleUrls: ['./webs-ej.component.css'],
  providers: [ UserService,DataService]
})
export class WebsEjComponent implements OnInit {
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
  public CaracteristicasProject: string[] = [];
  public ToolsProject: string[] = [];

  constructor(
    public _router: Router,
    private _DataService: DataService, 
    private _UserService: UserService 
  ) { }

  ngOnInit(): void {
    this.getProjects();
    $('.auxInfoP').hide();

  }

  getProjects() {
    this._DataService.getrPojects().subscribe(
      response => {
        for (let i = 0; i < 8; i++) {
          this.Projects.push(response.result[0]);
        }
        console.log(this.Projects)
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

    $('.auxInfoP').fadeIn(300);
    
  }

  close() {
    $('.auxInfoP').fadeOut(300);
  }

  hoverSVG(child:any) {
    $('.titleInfo').addClass('svgHover');
  }

  noHoverSVG(child:any) {
    $('.titleInfo').removeClass('svgHover');
  }
}
