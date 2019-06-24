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

//localhost:5000/api/notification
// Get
// Get All notifications

router.get("/" ,(req,res) => {
    notificationSchema.find().exec().then( notification => {
        res.status(200).send({message: "Fetch Successful", notification: notification})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

//localhost:5000/api/notification/:to
// Get
// Get Nofifications related to user

router.get("/:to" ,(req,res) => {
    notificationSchema.find({to: req.params.to}).exec().then( notification => {
        res.status(200).send({message: "Fetch Successful", notification: notification})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})

//localhost:5000/api/notification/:id
// DELETE
// Delete a request

router.delete("/:id" ,(req,res) => {
    notificationSchema.remove({_id : req.params.id}).then( notification => {
        res.status(200).send({message: "Fetch Successful", notification: notification})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})


module.exports = router;