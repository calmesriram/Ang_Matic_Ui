import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public mydata:any=["a","b","c","d"];
  constructor(private router:Router,private Api:ApiService) { }

  ngOnInit() {

  }

}
