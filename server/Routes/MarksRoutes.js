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

// let marksId = 1;
// router.get // router.post router.delete  router.put

//localhost:5000/api/marks/
//POST
//Add marks

    router.post("/", (req,res) => {
        const newMarks = marksSchema ({
            // _id : "M" + marksId ,
            assignmentName : req.body.assignmentName ,
            studentUsername: req.body.studentUsername,
            instructorUsername:req.body.instructorUsername ,
            mark :req.body.mark
        })

        newMarks.save().then( marks => {
            // marksId++;
            res.status(200).send({message : "Successfully Added Marks", marks : marks})

        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })

        const newNotification = notificationSchema({
            from : req.body.instructorUsername ,
            to : req.body.studentUsername ,
            action : `Your marks for assignment ${req.body.assignmentName} is ${req.body.mark} ` ,
            date : Date.now()
        })
        newNotification.save().then( notification => {
            console.log(notification)
        })

    })

module.exports = router;