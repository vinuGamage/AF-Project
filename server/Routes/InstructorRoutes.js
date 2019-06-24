const express= require('express');
const router=express.Router();
const nodemailer = require('nodemailer');
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

// let instructorId = 1;

//localhost:5000/api/instructor
// POST
// Create Instructor

    router.post("/", (req,res) => {
        const newInstructor = instructorSchema ({
            // _id : "I" + instructorId,
            username : req.body.username,
            password : req.body.password,
            securityQuestion : req.body.securityQuestion,
            securityAnswer : req.body.securityAnswer,
            phone : req.body.phone,
            fullName : req.body.fullName,
            email : req.body.email
        })

        console.log(newInstructor)

        newInstructor.save().then( instructor => {
            // instructorId++;
            res.status(200).send({message : "Successfully Added instructor", addedObject : instructor})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })

        const output=` <b>Courseweb login credentials</b> <p>Dear Sir/Madam,</p> <p> We have successfullu created your account. The credentials are given below</p> <p>Username : ${req.body.username} </p>  <p>Password : ${req.body.password}</p> `;

        let transporter = nodemailer.createTransport ({

            service: 'Gmail',

            auth : {
                user : 'courseweb1997@gmail.com',
                pass : 'courseweb'
            },
            tls:{ rejectUnauthorized:false }
        })



        let mailOptions = {
            from : 'courseweb1997@gmail.com',
            to: req.body.email,
            subject : "Login Credentials",
            html : output
        }

        transporter.sendMail(mailOptions, (err, info) =>{
            if (err) {
                console.log("error")
                return console.log(err)

            }
            console.log("no error")
            console.log(`Message sent : ${info.messageId} `)
            console.log (`Preview URL ${nodemailer.getTestMessageUrl (info)}`)
        })


    })


//localhost:5000/api/instructor
// Get
// Get All instructor

    router.get("/" ,(req,res) => {
        instructorSchema.find().exec().then( instructors => {
            res.status(200).send({message: "Fetch Successful", instructors: instructors})
        }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })
    })

//localhost:5000/api/instructor/username
// PUT
// Update Instructor

    router.put("/:username", (req,res) => {


        instructorSchema.update({username : req.params.username},   {
                                securityQuestion : req.body.securityQuestion,
                                securityAnswer : req.body.securityAnswer,
                                phone : req.body.phone,
                                fullName : req.body.fullName,
                                email : req.body.email})
            .then(updatedInstructor => {
                res.status(200).send({message : "Successfully Updated Instructor", updatedObject : updatedInstructor})
            }).catch( err => {
            res.status(500).send({message : "Unsuccessful", error : err})
        })


    })

//localhost:5000/api/instructor/username
// GET
// Check unique username

    router.get("/:username" ,(req,res) => {
        instructorSchema.find({username : req.params.username}).exec().then( instructor => {
            res.status(200).send({message: "Found", instructor: instructor})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    })

//localhost:5000/api/instructor/username/password
// GET
// Login Validation

    router.get("/:username/:password" ,(req,res) => {
        instructorSchema.find({username : req.params.username,password:req.params.password}).exec().then( instructor => {
            res.status(200).send({message: "Found", instructor: instructor})
        }).catch( err => {
            res.status(500).send({message : "Not Found", error : err})
        })
    })




module.exports = router;