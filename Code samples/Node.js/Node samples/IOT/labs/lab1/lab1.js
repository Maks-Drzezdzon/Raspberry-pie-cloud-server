var fs = require('fs');

fs.readFile("index.html", function (err, data) {
	if (err) {
    	console.log(err);
	} else {
    	console.log(data.toString());
	});

}
