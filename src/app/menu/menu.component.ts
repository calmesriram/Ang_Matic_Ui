import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public Api:ApiService) { }
 public username:string;
  ngOnInit() {
  this.username = atob(sessionStorage.getItem("user"))
  }
  logout(){
    this.Api.logout();
    console.log(this.Api.isLoggedOut(),"logout");
    console.log(this.Api.isLoggednIn(),"logged in")
  }
}
