const mongoose = require('mongoose');
const schema = mongoose.Schema;


    const Admin = new schema ({

        username: {
            type : String,
            required : true
        },
        password: {
            type : String,
            required : true
        },
        securityQuestion: {
            type : String,
            required : true
        },
        securityAnswer: {
            type : String,
            required : true
        },
        phone: {
            type : String,
            required : true
        },
        fullName: {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        }

    })


    const Instructor = new schema ({

        username: {
            type : String,
            required : true
        },
        password: {
            type : String,
            required : true
        },
        securityQuestion: {
            type : String,
            required : true
        },
        securityAnswer: {
            type : String,
            required : true
        },
        phone: {
            type : String,
            required : true
        },
        fullName: {
            type : String,
            required : true
        },
        coursesNameArray: {
            type : Array,
            default : null
        },
        email : {
            type : String,
            required : true
        }

    })

    const Student = new schema ({

        username: {
            type : String,
            required : true
        },
        password: {
            type : String,
            required : true
        },
        securityQuestion: {
            type : String,
            required : true
        },
        securityAnswer: {
            type : String,
            required : true
        },
        phone: {
            type : String,
            required : true
        },
        fullName: {
            type : String,
            required : true
        },
        coursesNameArray: {
            type : Array,
            default: null
        },
        email : {
            type : String,
            required : true
        }

    })

    const Notification = new schema ({

        from: {
            type : String,
            required : true
        },
        to: {
            type : String,
            required : true
        },
        action: {
            type : String,
            required : true
        },
        courseName: {
            type : String,

        },
        assignmentName: {
            type : String,

        },
        date: {
            type : Date,
            required : true
        }
    })


    const Course = new schema ({

        name: {
            type : String,
            required : true
        },
        credits: {
            type : Number,
            required : true
        },
        enrollmentKey: {
            type : String
        },
        instructorUsernameArray: {
            type : Array
        },
        studentUsernameArray: {
            type : Array,
            default : null
        },
        open : {
            type : Boolean,
            default : false
        }
    })

    const Assignment = new schema ({

        dueDate: {
            type : String,
            required : true
        },
        instructorUsername: {
            type : String,
            required : true
        },
        courseName: {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        }
    })

    const Submission = new schema ({

        assignmentName: {
            type : String,
            required : true
        },
        studentUsername: {
            type : String,
            required : true
        },
        dateSubmitted: {
            type : String,
            required : true
        },
        fileName : {
            type : String,
            required : true
        }
    })

    const Marks = new schema ({

        assignmentName: {
            type : String,
            required : true
        },
        studentUsername: {
            type : String,
            required : true
        },
        instructorUsername: {
            type : String,
            required : true
        },
        mark: {
            type : Number,
            required : true
        }
    })


    mongoose.model('Admin',Admin);
    mongoose.model('Instructor',Instructor);
    mongoose.model('Student',Student);
    mongoose.model('Notification',Notification);
    mongoose.model('Course',Course);
    mongoose.model('Assignment',Assignment);
    mongoose.model('Submission',Submission);
    mongoose.model('Marks',Marks);





mongoose.connect('mongodb://atheeq:atheeq@mernshopping-shard-00-00-fbkn6.mongodb.net:27017,mernshopping-shard-00-01-fbkn6.mongodb.net:27017,mernshopping-shard-00-02-fbkn6.mongodb.net:27017/courseweb?ssl=true&replicaSet=MernShopping-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true })
    .then(
        ()=> console.log("DB Connected"),
        error => console.log(error)
    )
module.exports = mongoose;