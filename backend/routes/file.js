const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const FileResident = require("../models/file");



// type files
const MIME_TYPE_MAP = {
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/uploads");
    /*    let error = new Error("Invalid mime type");
        cb(null, "backend/uploads") */
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


// Add contract files
router.post("", multer({
    storage: storage
  }).array('file', 4),
  // .array('file',5)
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.files);
    console.log('file added successfully');
    const fileResident = new FileResident({
      name: req.files[0].originalname,
      lastModifiedDate: Date.now(),
      filePath: req.files[0].filename,
      fieldNameFront: req.body.fieldNameFront,
      residentIdFile: req.body.residentIdFile
    });
    fileResident.save().then(createdFileResident => {
      res.status(201).json({
        message: "Contract added successfully",
        fileResident: {
          ...createdFileResident,
          id: createdFileResident._id
        }
      });
      console.log(fileResident);
    });
  });


// View all contracts files
router.get("", (req, res, next) => {
  FileResident.find().then(documents => {
    if (documents) {
      res.status(200).json({
        message: "File Info fetched successfully!",
        fileResidents: documents
      });
    } else {
      res.status(404).json({
        message: "File Info not found!"
      });
    }
  });
});

// get one file
/* router.get("/:id", (req, res, next) => {
  FileResident.findById(req.params.id).then(fileResident => {
    if (fileResident) {
      res.status(200).json(fileResident);
      console.log(fileResident);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
}); */

// Delete a file


router.delete("/residentFile/:residentIdFile", (req, res, next) => {
  FileResident.deleteMany(
    {residentIdFile: req.params.residentIdFile  }).then(result => {
      console.log(req.params.residentIdFile + " result residentIdFile");
    if (result) {
      res.status(200).json({
        message: "File deleted successfully! from Resident Id",

      });
    } else {
      res.status(404).json({
        message: "File Info not found!"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  FileResident.deleteOne(
    {_id: req.params.id  }).then(result => {
      console.log(req.params.id + " result ID");
    if (result) {
      res.status(200).json({
        message: "File deleted successfully! from ID",

      });
    } else {
      res.status(404).json({
        message: "File Info not found!"
      });
    }
  });
});



// Download files
router.get("/:fileName", function (req, res, next) {
  console.log('download function');
  const fileName = path.join(__dirname, '../uploads') + '/' + req.params.fileName;
  res.sendFile(fileName);
});


/* router.delete("/:id", (req, res, next) => {
  FileResident.deleteOne(
    {_id: req.params.id  }).then(result => {
      console.log(req.params.id + " result ID");
    if (result) {
      res.status(200).json({
        message: "File deleted successfully! from ID",

      });
    } else {
      res.status(404).json({
        message: "File Info not found!"
      });
    }
  });
}); */

/* router.get('/:filePath', function (req, res){
    filePath = req.params.filePath;
    const dirname = path.resolve(".")+'';
    var img = fs.readFileSync(dirname  + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
}); */

// Download files
/* router.post("/download", function(req,res,next){
  console.log(req.body.filePath);
  filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filePath;
  res.sendFile(req.body.filepath);
  // res.download(filepath, req.body.filePath);
}); */


// formidable, example marche
/*
router.post("", (req, res, next) =>{
  const form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {


    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log(contract);
    console.log('file', file.name);
    readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
});
// essai à supprimer
 /* const url = req.protocol + "://" + req.get("host");
    const contract = new FileResident ({
      contract: url + "/file/" + req.file.filename
    });
    contract.save().then(createdContract => {
      res.status(201).json({
        message: "contract added successfully",
        contract: {
          ...createdContract,
          id: createdContract ._id
        }
      });
    });

    router.get("/:id", (req, res, next) => {
  FileResident.findById(req.params.id).then(fileResident => {
    if (fileResident) {
      res.status(200).json(fileResident);
      console.log(fileResident);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

    */

module.exports = router;
