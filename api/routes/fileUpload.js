var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');
var UserModel = require('../models/UserModel.js');

var router = express.Router();
var upload = multer({dest:'uploads/'});

var cpUpload = upload.single('postImg')

//router.post('/', function(req, res, next) {
  //  console.log(req.body);
    //console.log(req.files.myImage);
    //res.send("file upload");
//});
/*router.post('/', cpUpload, function(req,res){

  console.log(req.file);
  res.redirect('/');

});*/
var fs = require('fs');
router.post('/', cpUpload, function(req, res) {

	console.log(req.files);
	console.log(req.body);

    // get the temporary location of the file
    var tmp_path = req.files.postImg.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/images/' + req.files.postImg.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.postImg.size + ' bytes');
        });
    });
});

/*router.post('/', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + thumbnail); 
        fstream = fs.createWriteStream(__dirname + '/files/' + thumbnail);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});*/

/*var fs = require('fs');
  var fstream;
  var folder = 'public/images/tmp/'; 
  var path;
  var images = [];
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {                      
    if(filename){            
        if (!fs.existsSync(folder)) {                
            fs.mkdirSync(folder,0744);
        }            
        path = folder+ filename;
        fstream = fs.createWriteStream(path);
        file.pipe(fstream);  
    } else {
        path= undefined;            
    }
    images.push(path);
    res.send(images);
}); */  

module.exports = router;

