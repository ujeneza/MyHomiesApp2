const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const IncomingForm = require('formidable').IncomingForm;




// type files
const MIME_TYPE_MAP = {
  "doc/doc": "doc",
  "doc/docx": "docx",
  "doc/pdf": "pdf",
  "doc/xlsx": "xlsx",
  "doc/xls": "xls",
  "doc/png": "png",
  "doc/jpeg": "jpg",
  "doc/jpg": "jpg"
};

// create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/docs");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

var form = new IncomingForm();

/*
const store = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, './uploads');
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+'.'+file.originalname);
  }
});
const upload = multer({storage:store}).single('file');

router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});
*/
module.exports = router;
