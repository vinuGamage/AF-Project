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

// let courseId = 1;

//localhost:5000/api/course
// POST
// Create Course

router.post("/", (req,res) => {
    // let id = "C"+courseId;
    const newCourse = courseSchema ({
        // _id : "C" + courseId,
        name : req.body.name,
        credits : req.body.credits,
        enrollmentKey : req.body.enrollmentKey,
        instructorUsernameArray : req.body.instructorUsernameArray.split(",")

    })

    console.log(newCourse)

    newCourse.save().then( course => {
        // courseId++;
        res.status(200).send({message : "Successfully Added course", addedObject : course})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })

    req.body.instructorUsernameArray.split(",").forEach( val => {
        console.log(val)

        instructorSchema.update({ username: val}, {$push: {coursesNameArray: req.body.name }}).then( update => {
            console.log(update)
        })

        const newNotification = notificationSchema({
            from : "Admin" ,
            to : val ,
            action : `Admin has added you to the course  ${req.body.name} and Press okay to Accept` ,
            courseName : req.body.name,
            date : Date.now()
        })
         newNotification.save().then( notification => {
             console.log(notification)
         })
    })

})


//localhost:5000/api/course
// Get
// Get All courses

router.get("/" ,(req,res) => {
    courseSchema.find().exec().then( courses => {
        res.status(200).send({message: "Fetch Successful", courses: courses})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

//localhost:5000/api/course/:courseName
// Get
// Get All co

router.get("/:courseName" ,(req,res) => {
    courseSchema.find({name : req.params.courseName}).exec().then( course => {
        res.status(200).send({message: "Fetch Successful", course: course})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

//localhost:5000/api/course/:CourseName
// PUT
// Accept Course

router.put("/:courseName" ,(req,res) => {
    courseSchema.update({name : req.params.courseName}, {open : true}).then( courses => {
        res.status(200).send({message: "Fetch Successful", courses: courses})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

module.exports = router;