import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent {
  categoryform = this.builder.group({
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
  });
  public constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router){} 
  public proceedaddcategory(){
    // event.preventDefault();
    if(this.categoryform.valid){    
      //console.log(this.registerform.value);
      var user = JSON.parse(this.service.getUserLogin()!);
      var data: any = this.categoryform.value;
      data.UserId = user.user.id;
      this.service.addCategory(data, {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer '+user.token
          })
      }).subscribe(res => {
        //console.log(res);
        this.toastr.success("Add category success");
        this.router.navigate(['category']);
      });
    }else{
      this.toastr.warning("Dữ liệu không hợp lệ");
    }
  }
}
