import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = "https://localhost:7220/api";
  public register(inputdata: any){
    return this.http.post(this.apiUrl+"/Accounts/Register", inputdata);
  }

  public login(inputdata: any){
    return this.http.post(this.apiUrl+"/Accounts/Login", inputdata);
  }
  public isLogin(){
    return sessionStorage.getItem("isLogin") !== null;
  }
  public getUserLogin(){
    return sessionStorage.getItem("isLogin");
  }
  public getAllCategories(idUser: any){
    //console.log("id:"+idUser);
    return this.http.get(this.apiUrl+"/Category/GetAll/"+idUser);
  }
  public addCategory(data: any, httpOptions: any){
    //console.log("id:"+idUser);
    return this.http.post(this.apiUrl+"/Category/AddCategory", data, httpOptions);
  }
  public deleteCategory(id: any, httpOptions: any){
    //console.log("id:"+idUser);
    return this.http.delete(this.apiUrl+"/Category/DeleteCategory/"+id, httpOptions);
  }

}
