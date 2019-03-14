const fs = require('fs');

//callback synchronously
fs.copyFileSync('index.html', 'index2.html', err => {
 if (err) return console.error(err)
});
 console.log('success!')


//callback asynchronously
 fs.copyFile('index.html', 'index2.html', err => {
  if (err) return console.error(err)
  console.log('success!')
 });
