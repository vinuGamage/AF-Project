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

//localhost:5000/api/security/type/username
// GET
// Get security question

router.get("/:type/:username" ,(req,res) => {

    if(req.params.type == "admin"){
        adminSchema.find({username : req.params.username}).exec().then( admin => {
            console.log("security");
            res.status(200).send({message: "Found question in security", admin: admin})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })

    }else if (req.params.type == "instructor"){
        instructorSchema.find({username : req.params.username}).exec().then( instructor => {
            console.log("security");
            res.status(200).send({message: "Found question in security", instructor: instructor})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    }
    else {
        studentSchema.find({username : req.params.username}).exec().then( student => {
            console.log("security");
            res.status(200).send({message: "Found question in security", student: student})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    }



})

//localhost:5000/api/security/type/username/:answer
// GET
// Validate answer

router.get("/:type/:username/:answer" ,(req,res) => {

    if(req.params.type == "admin"){

        adminSchema.find({username : req.params.username, securityAnswer : req.params.answer}).exec().then( admin => {
            res.status(200).send({message: "Found answer in security", admin: admin})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })

    }else if (req.params.type == "instructor"){
        instructorSchema.find({username : req.params.username, securityAnswer : req.params.answer}).exec().then( instructor => {
            res.status(200).send({message: "Found answer in security", instructor: instructor})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    }
    else {
        studentSchema.find({username : req.params.username, securityAnswer : req.params.answer}).exec().then( student => {
            res.status(200).send({message: "Found answer in security", student: student})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    }


})

//localhost:5000/api/security/:type/:username/:password
// POST
// Change Password

router.post("/:type/:username/:newPassword" ,(req,res) => {

    if(req.params.type == "admin"){
        adminSchema.update({username : req.params.username}, {password : req.params.newPassword}).then( admin => {
            res.status(200).send({message: "Updated Password successfully", admin: admin})
        }).catch( err => {
            res.status(500).send({message : "Update Failed", error : err})
        })

    }else if (req.params.type == "instructor"){
        instructorSchema.update({username : req.params.username}, {password : req.params.newPassword}).then( instructor => {
            res.status(200).send({message: "Updated Password successfully", instructor: instructor})
        }).catch( err => {
            res.status(500).send({message : "Update Failed", error : err})
        })
    }
    else {
        studentSchema.update({username : req.params.username}, {password : req.params.newPassword}).then( student => {
            res.status(200).send({message: "Updated Password successfully", student: student})
        }).catch( err => {
            res.status(500).send({message : "Update Failed", error : err})
        })
    }


})


module.exports = router;