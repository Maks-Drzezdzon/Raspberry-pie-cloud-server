var fs = require('fs');


//`var SourceFile = process.argv.slice(2);
//var TargetFile = process.argv.slice(3);

//if (SourceFile && TargetFile !== null){
var test = process.argv.slice(2);
console.log('test ' , test);


function copyFile(SourceFile , TargetFile){
  fs.copyFile(SourceFile , TargetFile, (err) =>{
    if (err) return console.error(err);
    console.log();
  });
  console.log('Done');
}

//}
