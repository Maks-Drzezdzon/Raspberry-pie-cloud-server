var fs = require('fs');


function copy(source , target){
  fs.copyFile("source ","target" , (err) =>{
    if(err) throw err;
    console.log(source + 'was coppied to ' + target);
  });
}




fs.copyFile('index.html' , 'BkUpindex2.html' , (err) =>{
  if (err) throw err;
  console.log('index.html was coppied to BkUpindex2.html');
});
