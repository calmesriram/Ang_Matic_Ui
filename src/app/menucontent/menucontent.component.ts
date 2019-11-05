import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Buffer } from 'buffer';

declare var require:any;
var util = require('ethereumjs-util');
@Component({
  selector: 'app-menucontent',
  templateUrl: './menucontent.component.html',
  styleUrls: ['./menucontent.component.css']
})
export class MenucontentComponent implements OnInit {
  toppings = new FormControl();
  name = new FormControl('');
  formGroup: FormGroup;
  
  model: any = {};
 

  public select_cur:string="";
  selectedFood1: string;
  public insertpvtkey:string;
  public selected_azaddress:string;
  public selected_mynotehash:string;
  public getNode_hash:string="";
  public getNodeHash_array:any=[];
  public getnode_array_total:any=[];
  public my_address:string;
  public my_private:string;
  public my_public:string;
  public my_value:string;
  public old_mint_value:string;
  public address_currency_value:string;
  public total_mint:Number;
  //public get_address=[];
  //test: `any[] = [];`
  public get_address:any= [];
  public get_address1:any= [];
  public get_currency:String;
  public selectedadd:string;
  public join_res_array:any= [];
  public item_selected:String;
  public test_array:any=[];
  public entryvalue:any=[];
  constructor(private formBuilder: FormBuilder,public Api:ApiService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'privatekey': ['', [Validators.required,Validators.minLength(66),Validators.maxLength(66)]],    
    });

    // api calls
    this.getAddress();
    this.join();
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

 selectedAddress(data){
   console.log(data,"selected address")   
   this.selectedadd = data.zkaddress
   this.address_currency_value = data.total_minted
 }
  get_Selected_node_hash_all(data){
    console.log(data,"dafd")    
    this.Api.getNodehash(data).then(res =>{
      console.log(res,"node hash res copy")
      this.getNodeHash_array = res['data']
      var total=0;
      // res['data'].forEach(element => {
      //    total += Number(element.value)
      //    console.log(element.value,"element value")
      // });
      // this.address_currency_value = total.toString();
      // console.log(total,"total")
      console.log(this.getNodeHash_array)
    })
  }

  old_req_and_New(){
 console.log(Number(this.address_currency_value)+Number(this.my_value))
 this.total_mint = Number(Number(this.address_currency_value)+Number(this.my_value))
 console.log(this.total_mint)
  }

  get_node_hash(){    
    console.log(this.getNode_hash,"getNode_hash")
    this.Api.getNodehash(this.getNode_hash).then(res =>{
      console.log(res,"node hash res")
      this.getNodeHash_array = res['data']
      console.log(this.getNodeHash_array)
    })
  }

  showkeys(pvtkey){
    this.Api.getpubkeyAndAddress(pvtkey)
  }
  g(){
    console.log("clicked");
    console.log(this.insertpvtkey,"ram")
    this.signnote()
  }

  selectnotekey(data){
    console.log(data,"selected value")    
    console.log(data.assetAddress,data.note_hash)
    this.selected_azaddress = data.assetAddress;
    this.selected_mynotehash =data.note_hash;
  }
  
  signnote(){

    // let zkAssetAddress = "0x2fa381ae1b708c4fF7B974bdA08EA1F48fBAb87F";
    // let notehash ="0x9e9ac3ae1d818a9b0ff973638e08b22bd6916b34b1d50ffca1bbb2b40196e005"
    // let spender = "0x57000A801333D2F5D29F07450Ce29291C16293dB";
    // let privatekey = "ac071cfa36749d1a7b1b802ff0583a5f9bf1b6ef650dcd882578f2c22f135408"
    let spender = "0x57000A801333D2F5D29F07450Ce29291C16293dB";
     this.Api.signNote(this.selected_azaddress,this.selected_mynotehash,spender,this.insertpvtkey).then(res =>{
      console.log(res,"res form menu content")
      console.log(res[0] + res[1].slice(2) + res[2].slice(2),"sliced")
    })
  }

  newCreatenote(){
    let zkAssetAddress = "0x2fa381ae1b708c4fF7B974bdA08EA1F48fBAb87F";
    let value=100000;
    let Az_pvtkey="0xac071cfa36749d1a7b1b802ff0583a5f9bf1b6ef650dcd882578f2c22f135408";
    // let Az_pubkey ="0x04242a636931f1fcba041c3fd228714675684b984be660378816ec29ba86be89be57960c678806b7b637813bf73e19d2f61601ec74b97d8af7bc48180899e9d9ab";
    
       
    var buf_enc = Buffer.from(this.my_private,'hex');
    
    let address = util.privateToAddress(buf_enc)
    console.log(address.toString('hex'),"Address")
    
    let publickey = util.privateToPublic(buf_enc)
    console.log(publickey.toString('hex'),"public key")

    console.log(this.my_value,this.my_address,this.my_private,"form data ")
    this.Api.createNote('0x04'+publickey.toString('hex'),this.selectedadd,"0x"+this.my_private,Number(this.address_currency_value)+Number(this.my_value),Number(this.my_value));
  }

  join(){
    this.join_res_array.length =0;
    this.Api.joinsplit().then(res =>{
      console.log('join',res)
    //  this.join_res_array =  res['data'];  
    res['data'].forEach((res)=>{
      if(res.status != 0)
      {
      this.join_res_array.push({
        'assetAddress': res.assetAddress,
        'note_hash': res.note_hash,
        'owner': res.owner,
        'publicKey': res.publicKey,
        'status': res.status,
        'symbol': res.symbol,
        'value': res.value,
        'viewKey': res.viewKey,
        'entryvalue':0
       }) 
      }
    })  
    
  
      // res['data'].forEach(itr =>{
      //   if(itr.status == 1){
      //  this.join_res_array = itr;        
      //   }    
      // })
      console.log(this.join_res_array,"arryar_jion")
    })
    
  }


  onFoodSelection1(event) {
    this.entryvalue=[];
    console.log("clicked",event)
    console.log(this.selectedFood1);
    this.test_array = this.selectedFood1;
    this.test_array.forEach((res,i)=>{
      this.entryvalue.push(0);
      this.join_res_array[i].entryvalue=0;
    })
    console.log(this.test_array,this.entryvalue,"seelcted array")
    // this.Api.joinsplit(this.test_array)
  }
  joinitems(){    
    console.log(this.item_selected,"selected")
    
  }
  entrybox(){
    console.log(this.test_array,this.entryvalue,this.join_res_array)
    this.test_array.forEach((res,i)=>{
      if(res.value>=this.entryvalue[i])
      {
        res.entryvalue=this.entryvalue[i]
      }
      else
      {
        res.entryvalue=0;
        this.entryvalue[i]=0;
        alert('you excced your node')
      }
    })
  }
}
