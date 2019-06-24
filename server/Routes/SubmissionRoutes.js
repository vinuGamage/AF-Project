const express= require('express');
const router=express.Router();
const format = require('date-format');

// imports related to file storage
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid =require("gridfs-stream")

// imports related to normal data storage
const mongooseData = require('../DBSchema');

    const adminSchema = mongooseData.model('Admin');
    const instructorSchema =mongooseData.model('Instructor');
    const studentSchema =mongooseData.model('Student');
    const notificationSchema =mongooseData.model('Notification');
    const courseSchema =mongooseData.model('Course');
    const assignmentSchema =mongooseData.model('Assignment');
    const submissionSchema =mongooseData.model('Submission');
    const marksSchema =mongooseData.model('Marks');

// gridfs
const conn = mongoose.createConnection('mongodb://atheeq:atheeq@mernshopping-shard-00-00-fbkn6.mongodb.net:27017,mernshopping-shard-00-01-fbkn6.mongodb.net:27017,mernshopping-shard-00-02-fbkn6.mongodb.net:27017/files?ssl=true&replicaSet=MernShopping-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true });
// let submissionId =1;
let gfs;

        conn.once('open', () => {
            gfs = Grid(conn.db,mongoose.mongo)
            gfs.collection('files')
        })

        const storage = new GridFsStorage({
            url:'mongodb://atheeq:atheeq@mernshopping-shard-00-00-fbkn6.mongodb.net:27017,mernshopping-shard-00-01-fbkn6.mongodb.net:27017,mernshopping-shard-00-02-fbkn6.mongodb.net:27017/files?ssl=true&replicaSet=MernShopping-shard-0&authSource=admin&retryWrites=true',
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = Date.now() +"" +file.originalname;
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'files'
                    };
                    resolve(fileInfo);
                });
            }
        });

        const uploads = multer({ storage });


//localhost:5000/api/submission/file
//POST
//Upload a file
        router.post('/file',uploads.single('file'), (req,res) => {
            res.json({file : req.file})
        })

//localhost:5000/api/submission/file
//GET
//GET all files
    router.get ('/file',(req,res) => {
        gfs.files.find().toArray( (err,files) => {
             if(!files || files.length === 0){
                 return res.status(500).send({message : "No files found"})
             }
             return res.status(200).send({files: files})
        })
    })

//localhost:5000/api/submission/file/filename
//GET
//GET all files
//     router.get('/file/:filename', (req,res) => {
//         gfs.files.findOne({filename : req.params.filename},(err,files) => {
//             if(!files || files.length === 0){
//                 return res.status(500).send({message : "No files found"})
//             }
//             return res.status(200).send({files: files})
//
//         })
//     })

    router.get('/file/:filename', (req, res) => {
        gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
            if(!files || files.length === 0){
                return res.status(404).json({
                    message: "Could not find file"
                });
            }
            var readstream = gfs.createReadStream({
                filename: files[0].filename
            })
            res.set('Content-Type', files[0].contentType);
            return readstream.pipe(res);
        });
    });

//localhost:5000/api/submission/
//POST
//Add a submission

    router.post("/",(req,res) => {

        console.log(format("yyyy-MM-dd"))

        const newSubmission = submissionSchema({
            // _id : "S" + submissionId ,
            assignmentName : req.body.assignmentName,
            studentUsername: req.body.studentUsername ,
            dateSubmitted: format("yyyy-MM-dd") ,
            fileName : req.body.fileName
        })
        newSubmission.save().then( submission=> {
            // submissionId++;
            res.status(200).send({message : "Successfully Added Submission", addedObject : submission})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })
    })

//localhost:5000/api/submission/:assignmentID
//GET
//Get assignments

    router.get("/:assignmentName", (req,res) => {
        submissionSchema.find({assignmentName: req.params.assignmentName}).exec().then (assignments => {
            res.status(200).send({message : "Successfully fetched assignments", submission : assignments})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })
    })

module.exports = router;