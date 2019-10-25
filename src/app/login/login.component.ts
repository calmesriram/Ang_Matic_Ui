import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder,public Api:ApiService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }


  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(post) {
    console.log(post)
     this.Api.APIlogin(post).then(res =>{
       console.log(res ,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
     })
  }
  test(data1,data2){
    var senddata ={
      notehash:data1,
      viewingkey:data2
    }
    console.log(senddata,"before send")
    this.Api.sendmsg(senddata);
  }
  get(){
    this.Api.getmsg();
  }
  samplenote_Create(){
    this.Api.createsamplenote();
  }
  // t(){
  //   console.log("t is clicked")
  //   this.Api.test();
  // }
}
