import React, {Component} from 'react';
import '../../styles/common/Form.css';
const moment = require("moment")

class AssignmentCreation extends Component {

    constructor(props){
        super(props);

        this.state={
            name:'',
            courseName:'',
            instructorUsername:localStorage.getItem("username"),
            dueDate:'',

            formErrors:{
                name:'',
                courseName:'',
                instructorUsername:'',
                dueDate:''
            },
            nameValid:false,
            // formValid :false,
            courseValid:false,
            instructorUsernameValid:true,
            dueDateValid:false,
            courses : []
        }


    }

    componentDidMount() {

        fetch('http://localhost:5000/api/instructor/'+localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{

            console.log(data.instructor[0].coursesNameArray)
            this.setState({courses:data.instructor[0].coursesNameArray});
            console.log(this.state.courses)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

    }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let courseValid = this.state.courseValid;
        let instructorUsernameValid = this.state.instructorUsernameValid;
        let dueDateValid = this.state.dueDateValid;


        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 1;
                fieldValidationErrors.name = nameValid ? '': 'Assignment name is invalid';
                break;

            case 'courseName':
                courseValid = value.length >= 1;
                fieldValidationErrors.courseName = courseValid ? '': 'Course name is invalid';
                break;

            case 'instructorUsername':
                instructorUsernameValid = value.length >= 1;
                fieldValidationErrors.instructorUsername = instructorUsernameValid ? '': 'Instructor Username is invalid';
                break;

            case 'dueDate':
                let letterNumber = /^[0-9a-zA-Z]+$/;
                dueDateValid = value.length >= 1
                fieldValidationErrors.dueDate = dueDateValid ? '': 'Due date is invalid';
                break;



            default:
                break;

        }

        this.setState({
            formErrors:fieldValidationErrors,
            nameValid:nameValid,
            courseValid:courseValid,
            instructorUsernameValid:instructorUsernameValid,
            dueDateValid:dueDateValid
        },this.validateForm);

    }

    validateForm(){
        this.setState({formValid:this.state.nameValid && this.state.courseValid && this.state.instructorUsernameValid &&  this.state.dueDateValid});
        // console.log(this.state.formValid);
    }

    onSubmit=(e)=> {
        e.preventDefault();

        const name = this.refs.name.value;
        const courseName = this.refs.courseName.value;
        const instructorUsername=  this.refs.instructorUsername.value;
        const dueDate=this.refs.dueDate.value;

        console.log(name)
        console.log(courseName)
        console.log(instructorUsername)
        console.log(dueDate)
        console.log(courseName + "-" + name)

        if((moment(dueDate).diff(moment(),"days") +1) < 2){
            this.setState({
                formErrors: { dueDate : "Please select a future date"}
            })
        }
        else{


            let isValid = false;
            this.state.courses.map( course => {
                if(course == courseName) {

                    isValid = true
                }
            })

            if(isValid) {

                fetch('http://localhost:5000/api/assignment/' + courseName + "-" + name   ,{
                    method :'GET',
                    headers:{'Content-Type' : 'application/json'}
                }).then(res=>{
                    return res.json();
                }).then( data => {
                    console.log(data)
                    let assignment = JSON.stringify(data.assignment);
                    console.log(assignment);


                    if (assignment != '[]'){
                        this.setState({
                            formErrors: { name : "Assignment already exists, try another name"}
                        })
                    }else {

                        let data = {
                            "dueDate":dueDate,
                            "instructorUsername":instructorUsername,
                            "courseName":courseName,
                            "name":courseName + "-" + name,

                        }
                        fetch('http://localhost:5000/api/assignment',{
                            method:"POST",
                            body:JSON.stringify(data),
                            headers:{"Content-Type" : "application/json"}
                        }).then(res=>{
                            return res.json();
                        }).then( data => {
                            console.log(data);
                            console.log(data.addedObject.username)

                            alert(`Assignment ${data.addedObject.name}  was successfully created and notification is sent to students who have enrolled`);
                            this.setState({
                                name:'',
                                courseName:'',
                                instructorUsername:localStorage.getItem("username"),
                                dueDate:''
                            })


                        }).catch(err=>{
                            console.log(`Error : ${err}`);
                        })

                    }

                }).catch(err=>{
                    console.log(`Error : ${err}`);
                })

            }else{
                this.setState({
                    formErrors: { courseName : "Enter a valid course name shown above"}
                })
            }

        }








    }

    render() {
        return (
            <div>
                <div className="backgroundImageWithMargin" >
                    <br/><br/><br/><br/><br/><br/>
                    <form className="borderStyle demoForm">

                        <p className="display-4 TextAlign">Assignment Creation</p>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="fullName">Assignment Name</label>
                            <input type="text"  className="form-control" name="name"
                                   placeholder="Assignment Name"
                                   value={this.state.name}
                                   onChange={this.handleUserInput}
                                   ref="name"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.name}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Course Name</label>

                            {this.state.courses.map(course=>{
                                return[
                                    <li>{course}</li>
                                ]
                            })}
                            <br/>

                            <input type="text"  className="form-control" name="courseName"
                                   placeholder="Course Name"
                                   value={this.state.courseName}
                                   onChange={this.handleUserInput}
                                   ref="courseName"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.courseName}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Instructor Username</label>
                            <input type="email"  className="form-control" name="instructorUsername"
                                   placeholder="Instructor Username"
                                   value={this.state.instructorUsername}

                                   ref="instructorUsername"
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Due Date</label>
                            <input  type="date"  className="form-control" name="dueDate"

                                   value={this.state.dueDate}
                                   onChange={this.handleUserInput}
                                   ref="dueDate"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.dueDate}</span>
                        </div>


                        <button type="submit" className="btn btn-primary TextAlign" disabled={!this.state.formValid} onClick={this.onSubmit}>Create Assignment</button>
                    </form>


                </div>
            </div>
        );
    }
}

export default AssignmentCreation;