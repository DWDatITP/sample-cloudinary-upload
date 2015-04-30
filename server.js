var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// For printing our uploaded image results to the browser
var util = require('util');

// use multer to process files
// that people upload.
var multer = require('multer');

// this makes it so that `req.files` has
// a value in the express route handler.
// The form must also have the `enctype="multipart/form-data"` attribute
// set, too.
app.use(multer());

// used to create a file read stream,
// to read incoming streamed data
var fs = require('fs');

// used to connect to cloudinary.
// You must set the environment variable `CLOUDINARY_URL`
var cloudinary = require('cloudinary');

if (!process.env.CLOUDINARY_URL) {
  throw new Error('You must set the environment variable `CLOUDINARY_URL`');
}

app.get('/', function(req, res){
  // Display a basic form that allows someone to upload a picture
  // Normally you would put this in your template directly, but
  // for the sake of simplicity we will just put together the HTML
  // in a string here and send it to the browser
  // The form MUST have the `enctype="multipart/form-data"` attribute
  // if you are uploading a file.
  res.send('<form action="/" method="post" enctype="multipart/form-data">' +
     '<p>Image: <input type="file" name="image"/></p>' +
     '<p><input type="submit" value="Upload"/></p>' +
     '</form>');
});

app.post('/', function(req, res){
  console.log('req.files: ',req.files);

  var imageStream = fs.createReadStream(req.files.image.path);

  var cloudStream = cloudinary.uploader.upload_stream(function(result) {
    console.log('done uploading: ',result);

    // The file is done uploading now.
    // You should save the uploaded url to your mongo database so
    // that you can retrieve and display it again later.
    res.send(
      '<img src="' + result.url + '">' + '<br>' +
      'Url: <a href="' + result.url + '">' + result.url + '</a>.<br>' +
      'Uploaded data: ' + util.inspect(result)
    );
  });

  imageStream.pipe(cloudStream);
});

app.listen(port, function(){
  console.log('listening on ',port);
});
