import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class DataService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    
    getrPojects():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'projects', {headers: headers});
    }
    addProject(project: any):Observable<any>{
        var params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'addProject',params,{headers: headers});
    }
    updateProject(project: any):Observable<any> {
        var params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'updateProject/'+project.id,params,{headers: headers});
    }
    deleteProject(id: string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'deleteProject/'+id, {headers: headers});
    }

    getStudies():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'studies', {headers: headers});
    }
    addStudies(Studie: any):Observable<any>{
        var params = JSON.stringify(Studie);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'addStudie',params,{headers: headers});
    }
    updateStudies(Studie: any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'updateStudie/'+Studie.id,Studie,{headers: headers});
    }
    deleteStudies(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'deleteStudie/'+id, {headers: headers});
    }


    getImg():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'imgs', {headers: headers});
    }
    addTool(tool:any):Observable<any> {
        var params = JSON.stringify(tool);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'addImg',params,{headers: headers});
    }
    deleteTool(id:string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'deleteImg/'+id, {headers: headers});
    }
    updateImg(tool:any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'updateImg/'+tool.id,tool,{headers: headers});
    }
}