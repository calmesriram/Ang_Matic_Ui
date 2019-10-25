import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-menucontent',
  templateUrl: './menucontent.component.html',
  styleUrls: ['./menucontent.component.css']
})
export class MenucontentComponent implements OnInit {
  formGroup: FormGroup;
  model: any = {};
  public select_cur:string="";
  
  public getNode_hash:string="";
  public getNodeHash_array:any=[];
  public getnode_array_total:any=[];
  //public get_address=[];
  //test: `any[] = [];`
  public get_address:any= [];
  public get_address1:any= [];
  public get_currency:String;
  constructor(private formBuilder: FormBuilder,public Api:ApiService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'privatekey': ['', [Validators.required,Validators.minLength(66),Validators.maxLength(66)]],    
    });

    // api calls
    this.getAddress();
  }

  getError(el) {
    switch (el) {
      case 'privatekey':
      if(this.formGroup.get('privatekey').status =="INVALID")
      {
        return 'privatekey Minimum length 66';
      }
        if (this.formGroup.get('privatekey').hasError('required')) {
          return 'privatekey required';
        }
        break;
        default:
        return '';
    }
  }
  createnode(pvtkey){
    console.log("called")
    if(pvtkey.length == 66){
      this.Api.createnode(pvtkey)
    }
    else{
      return false;
    }
    
  }
  getAddress(){   
    this.Api.getAddress().then(res =>{
     // this.get_address = res['message'];
      res['message'].map((key)=>{
        this.get_address.push(key) 
      })
      this.get_address1 = res["message"];
      console.log(this.get_address,"get address")
    })
  }

  dpSelected(){    
    this.get_currency="";
    this.Api.getCurrency(this.select_cur).then(res =>{
      console.log(res,"from comp")
      this.get_currency = res['data']['total_minted'];
      console.log(this.get_currency,"Curr")
    })
  }

  get_node_hash_copy(data){
    console.log(data,"dafd")    
    this.Api.getNodehash(data).then(res =>{
      console.log(res,"node hash res copy")
      this.getNodeHash_array = res['data']
      console.log(this.getNodeHash_array)
    })
  }

  get_node_hash(){    
    console.log(this.getNode_hash,"getNode_hash")
    this.Api.getNodehash(this.getNode_hash).then(res =>{
      console.log(res,"node hash res")
      this.getNodeHash_array = res['data']
      console.log(this.getNodeHash_array)
    })
  }

}
