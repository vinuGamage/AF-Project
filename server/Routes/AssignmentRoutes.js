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

// let assignmentId = 1;
// router.get // router.post router.delete  router.put

//localhost:5000/api/assignment/
//POST
//Add assignments

router.post("/",(req,res) => {
    const newAssignment = assignmentSchema({
        // _id : "A" + assignmentId,
        dueDate : req.body.dueDate,
        instructorUsername : req.body.instructorUsername,
        courseName : req.body.courseName,
        name : req.body.name
    })

    newAssignment.save().then( assignment => {
        // assignmentId++;
        res.status(200).send({message : "Successfully Added Assignment", addedObject : assignment})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })

    courseSchema.find({name: req.body.courseName }).exec().then( course => {
        course[0].studentUsernameArray.forEach(val => {
            console.log(val)

            const newNotification = notificationSchema({
                from : req.body.instructorUsername ,
                to : val ,
                action : `You are given the assignment named ${req.body.name} and the submission is on ${req.body.dueDate} ` ,
                courseName : req.body.courseName,
                date : Date.now()
            })
            newNotification.save().then( notification => {
                console.log(notification)
            })
        })
    }).catch(err => {
        console.log(err)
    })




})

//localhost:5000/api/assignment/:assignmentName
// Get
// Check unique assignment

router.get("/:assignmentName" ,(req,res) => {
    assignmentSchema.find({name : req.params.assignmentName}).exec().then( assignment => {
        res.status(200).send({message: "Fetch Successful", assignment: assignment})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

//localhost:5000/api/assignment/course/:courseName
// GET
// Get assignments related to a courseName

router.get("/course/:courseName" ,(req,res) => {

    assignmentSchema.find({courseName : req.params.courseName}).exec().then( assignment => {
        res.status(200).send({message: "Fetch Successful", assignment: assignment})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})


//localhost:5000/api/assignment/:assignmentName/:newDate
//PUT
//Update assignment date

router.put("/:assignmentName/:newDate", (req,res) => {
    console.log(req.url)
    assignmentSchema.update({name : req.params.assignmentName},{dueDate:req.params.newDate}).then( assignment => {
        res.status(200).send({message: "Found", assignment: assignment})
    }).catch( err => {
        res.status(500).send({message : "Not Found", error : err})
    })
})


module.exports = router;