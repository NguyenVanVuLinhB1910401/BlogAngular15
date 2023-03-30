import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerform = this.builder.group({
    firstname: this.builder.control('', Validators.required),
    lastname: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.email, Validators.required])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    confirmpassword: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
  });
  public constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router){

  } 
  public proceedregister(){
    // event.preventDefault();
    if(this.registerform.valid){    
      //console.log(this.registerform.value);
        if(this.registerform.value.password === this.registerform.value.confirmpassword){
          this.service.register(this.registerform.value).subscribe(res => {  
            console.log(res);
            var response : any = res;
            if(response.statusCode === 201){
              this.toastr.success("Đăng ký tài khoản thành công");
              this.router.navigate(['login']);
            }else{
              this.toastr.success("Đăng ký tài khoản thất bại");
            }
          });
        }else{
          this.toastr.warning("Mật khẩu không trùng khớp.");
        }
    }else{
      this.toastr.warning("Dữ liệu không hợp lệ.");
    }
  }

}
