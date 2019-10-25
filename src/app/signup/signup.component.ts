import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { validateBasis } from '@angular/flex-layout';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
      'contact': ['', [Validators.required,Validators.minLength(10)]],
      'email': ['',[Validators.email,Validators.required]],
      'country': ['',Validators.required],
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
      case 'contact':
      if (this.formGroup.get('contact').hasError('required')) {
        return 'Contact required';
      }
      break;
      case 'email':
      if (this.formGroup.get('email').hasError('required')) {
        return 'Email required';
      }
      break;  
      case 'country':
      if (this.formGroup.get('country').hasError('required')) {
        return 'Email required';
      }
      break;  
      default:
        return '';
    }
  }

  onSubmit(post) {
    // console.log(post)
    this.Api.reg(post).then(res =>{
      console.log(res,"form signup form ")
      if(res['status']==false){
        return;
      }else{
        this.formGroup.reset();
      }
    })
  //  this.formGroup.reset();
  }
}
