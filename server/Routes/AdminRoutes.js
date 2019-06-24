const express= require('express');
const router=express.Router();

const mongoose = require('../DBSchema');

const adminSchema = mongoose.model('Admin');
const instructorSchema =mongoose.model('Instructor');
const studentSchema =mongoose.model('Student');
const notificationSchema =mongoose.model('Notification');
const courseSchema =mongoose.model('Course');
const assignmentSchema =mongoose.model('Assignment');
const submissionSchema =mongoose.model('Submission');
const marksSchema =mongoose.model('Marks');


// router.get // router.post router.delete  router.put

// let adminId = 1;

//localhost:5000/api/admin
// POST
// Create Admin

    router.post("/", (req,res) => {
        const newAdmin = adminSchema ({
            // _id : "A" + adminId,
            username : req.body.username,
            password : req.body.password,
            securityQuestion : req.body.securityQuestion,
            securityAnswer : req.body.securityAnswer,
            phone : req.body.phone,
            fullName : req.body.fullName,
            email : req.body.email
        })

        console.log(newAdmin)

        newAdmin.save().then( admin => {
            // adminId++;
            res.status(200).send({message : "Successfully Added Admin", addedObject : admin})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })
    })

//localhost:5000/api/admin
// Get
// Get All admin

    router.get("/" ,(req,res) => {
        adminSchema.find().exec().then( admins => {
            res.status(200).send({message: "Fetch Successful", admins: admins})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })
    })

//localhost:5000/api/admin/username
// PUT
// Update Admin

    router.put("/:username", (req,res) => {


        adminSchema.update({username : req.params.username},   {
                                                    securityQuestion : req.body.securityQuestion,
                                                    securityAnswer : req.body.securityAnswer,
                                                    phone : req.body.phone,
                                                    fullName : req.body.fullName,
                                                    email : req.body.email})
            .then(updatedAdmin => {
                res.status(200).send({message : "Successfully Updated Admin", updatedObject : updatedAdmin})
            }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
            })


    })

//localhost:5000/api/admin/username
// GET
// Check unique username

    router.get("/:username" ,(req,res) => {
        adminSchema.find({username : req.params.username}).exec().then( admin => {
            res.status(200).send({message: "Found", admin: admin})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    })

//localhost:5000/api/admin/username/password
// GET
// Login Validation

    router.get("/:username/:password" ,(req,res) => {
        adminSchema.find({username : req.params.username,password:req.params.password}).exec().then( admin => {

            res.status(200).send({message: "Found", admins: admin})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    })




module.exports = router;