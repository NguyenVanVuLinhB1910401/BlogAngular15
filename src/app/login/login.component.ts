import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.email, Validators.required])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(8)])),
  });
  public constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router){} 
  public proceedlogin(){
    // event.preventDefault();
    if(this.loginform.valid){      
      this.service.login(this.loginform.value).subscribe(res => {  
        var response : any = res;
        if(response.statusCode === 200){
          sessionStorage.setItem("isLogin", JSON.stringify({user: response.user, token: response.token}));
          this.toastr.success("Đăng nhập thành công");
          this.router.navigate(['/']);
        }else{
          this.toastr.warning("Sai email hoặc mật khẩu");
        }
      });
    }else{
      this.toastr.warning("Dữ liệu không hợp lệ.");
    }
  }
}
