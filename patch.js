console.log("patching started")
const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

// fs.readFile(f, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

//   fs.writeFile(f, result, 'utf8', function (err) {
//     if (err) return console.log(err);
//   });
// });
// console.log("patching ended")
fs.writeFile("ram.txt","hai",(err,data)=>{
  if(err)
  return;
  if(data){
    console.log(data,"123")
  }
})