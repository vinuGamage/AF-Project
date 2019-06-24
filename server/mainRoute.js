const express=require('express');
const router=express.Router();

const adminRouter =  require ('./Routes/AdminRoutes');
const studentRouter =  require ('./Routes/StudentRoutes');
const instructorRouter =  require ('./Routes/InstructorRoutes');
const assignmentRouter =  require ('./Routes/AssignmentRoutes');
const courseRouter =  require ('./Routes/CourseRoutes');
const submmisionRouter =  require ('./Routes/SubmissionRoutes');
const marksRouter =  require ('./Routes/MarksRoutes');
const notificationRouter =  require ('./Routes/NotificationRoutes');
const securityRouter = require('./Routes/SecurityRoutes')

router.use('/admin', adminRouter);
router.use('/instructor', instructorRouter );
router.use('/student', studentRouter);
router.use('/assignment', assignmentRouter);
router.use('/course',courseRouter);
router.use('/submission', submmisionRouter);
router.use('/marks', marksRouter);
router.use('/notification', notificationRouter);
router.use('/security',securityRouter);


module.exports = router;