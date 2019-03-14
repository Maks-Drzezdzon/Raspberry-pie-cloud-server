var fs = require('fs');
/*
fs.readFile("index.html", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});
*/
/*
//backing up file with a data stream from the fs (fileSystem) module
fs.createReadStream('index.html').pipe(fs.createWriteStream('BkUpindex.html'));


//sync example the file is  coppied from x to b  under a different name
fs.copyFile('index.html' , 'BkUpindex2.html' , (err) =>{
  if (err) throw err;
  console.log('index.html was coppied to BkUpindex2.html');
});

*/

fs.copyFile('index.html' , 'BkUpindex2.html' , (err) =>{
  if (err) throw err;
  console.log('index.html was coppied to BkUpindex2.html');
});


//main function used to call
function copyFile(source , target , cb){
  callbackCalled = false;

  //creating a readstream and assigning it to rs
  //passing in source ref var from the main copyFile function
  //then calling on
  var rs = fs.createReadStream(source);
    rs.on("error" , function(err){
    done(err);
  });

  var ws = fs.createWriteStream(target);
    ws.on("error", function(err){
      done(err);
    });

  ws.on("close" , function(ex){
    done();
  });

  //same as above except it provides functions for rs createReadStream and ws createWriteStream
  rs.pipe(ws);
  console.log(source + ' was coppied to ' + target);

    //error handling
    function done(err){
      if(!callbackCalled){
        cb(err);
        callbackCalled = true;
      }
    }
}
