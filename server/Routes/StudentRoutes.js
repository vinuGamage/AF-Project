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

// let studentId = 1;

//localhost:5000/api/student
// POST
// Create student

router.post("/", (req,res) => {
    const newStudent = studentSchema ({
        // _id : "S" + studentId,
        username : req.body.username,
        password : req.body.password,
        securityQuestion : req.body.securityQuestion,
        securityAnswer : req.body.securityAnswer,
        phone : req.body.phone,
        fullName : req.body.fullName,
        email : req.body.email
    })

    console.log(newStudent)

    newStudent.save().then( student => {
        // studentId++;
        res.status(200).send({message : "Successfully Added student", addedObject : student})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})


//localhost:5000/api/student
// Get
// Get All student

router.get("/" ,(req,res) => {
    studentSchema.find().exec().then( students => {
        res.status(200).send({message: "Fetch Successful", students: students})
    }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })
})


//localhost:5000/api/student/username
// PUT
// Update student

router.put("/:username", (req,res) => {


    studentSchema.update({username : req.params.username},   {
                                                            securityQuestion : req.body.securityQuestion,
                                                            securityAnswer : req.body.securityAnswer,
                                                            phone : req.body.phone,
                                                            fullName : req.body.fullName,
                                                            email : req.body.email})
        .then(updatedStudent => {
            res.status(200).send({message : "Successfully Updated Student", updatedObject : updatedStudent})
        }).catch( err => {
        res.status(500).send({message : "Unsuccessful", error : err})
    })


})

//localhost:5000/api/student/username
// GET
// Check unique username

router.get("/:username" ,(req,res) => {
    studentSchema.find({username : req.params.username}).exec().then( student => {
        res.status(200).send({message: "Found", student: student})
    }).catch( err => {
        res.status(500).send({message : "Not Found", error : err})
    })
})

//localhost:5000/api/student/username/password
// GET
// Login Validation

router.get("/:username/:password" ,(req,res) => {
    studentSchema.find({username : req.params.username,password:req.params.password}).exec().then( student => {
        res.status(200).send({message: "Found", student: student})
    }).catch( err => {
        res.status(500).send({message : "Not Found", error : err})
    })
})

//localhost:5000/api/student/username/courseId/enrollmentkey
// PUT
// Enroll to a course

router.put("/:studentUsername/:coursename/:enrollmentKey", (req,res) => {
    courseSchema.update({name:req.params.coursename,enrollmentKey :req.params.enrollmentKey},{$push: {studentUsernameArray: req.params.studentUsername }})
        .then( course => {

            console.log(course.n);
            console.log(course.nModified);

            if(course.n != 0){
                studentSchema.update({username: req.params.studentUsername},{$push: {coursesNameArray: req.params.coursename }} ).then( student => {
                        console.log(student)
                    }

                )
            }
            res.status(200).send({message: "Found", course: course,})

    }).catch( err => {
        res.status(500).send({message : "Not Found", error : err})
    })



})

module.exports = router;