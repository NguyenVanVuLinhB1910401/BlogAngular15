import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'BlogAngular';
  ismenu = false;
  constructor(private router: Router, private toastr: ToastrService){}
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == "/login" || currenturl == "/register"){
      this.ismenu = false;
    }else{
      this.ismenu = true;
    }
  }
  public logout(){
    sessionStorage.clear();
    this.toastr.success("Đăng xuất thành công.");
    this.router.navigate(['login']);
  }
}
