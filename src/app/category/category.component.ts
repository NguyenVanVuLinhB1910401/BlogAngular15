import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(private service: AuthService, private toastr: ToastrService) {
    this.user = JSON.parse(this.service.getUserLogin()!);
    this.LoadCategories();
  }
  categories: any;
  user: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  LoadCategories(){
    this.service.getAllCategories(this.user?.user?.id).subscribe(res => {
      //console.log(res); 
      var response: any = res;
      this.categories = response.data;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['id', 'title', 'description', 'action'];
  public updateCategory(id: any){}
  public deleteCategory(id: any){
    if(window.confirm(`Are you sure?`)){
      this.service.deleteCategory(id, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer '+this.user.token
        })
      }).subscribe(res => {
        var response: any = res;
        if(response.statusCode == 200){
          this.toastr.success("Delete success");
          this.dataSource.data = this.dataSource.data.filter((r: any)=> r.id !== id);
        }
      })
      
    }
  }

}
