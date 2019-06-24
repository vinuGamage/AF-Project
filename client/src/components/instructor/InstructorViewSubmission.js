import React, {Component} from 'react';
import {Link} from "react-router-dom";

class InstructorViewSubmission extends Component {

    constructor (props){
        super (props);
        console.log(this.props)
        this.state = {
            submission :[],
            studentUsername : '',
            assignmentName : this.props.assignmentName,
            marks : '',
            studentUsernameValid:false,
            assignmentNameValid:true,
            marksValid:false,

            formErrors:{
                studentUsername:'',
                assignmentName:'',
                marks:''
            }

        }
    }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let studentUsernameValid = this.state.studentUsernameValid;
        let marksValid = this.state.marksValid;



        switch (fieldName) {
            case 'studentUsername':
                studentUsernameValid = value.length == 10;
                fieldValidationErrors.studentUsername = studentUsernameValid ? '': 'IT number is invalid';
                break;

            case 'marks':
                marksValid = value.length >= 1 && value.match(/^\d+$/);
                fieldValidationErrors.marks = marksValid ? '': 'Marks entered is invalid ';
                break;



        }

        this.setState({
            formErrors:fieldValidationErrors,
            studentUsernameValid:studentUsernameValid,
            marksValid:marksValid
        },this.validateForm);

    }

    validateForm(){
        this.setState({formValid:this.state.marksValid && this.state.studentUsernameValid});
        // console.log(this.state.formValid);
    }

    onSubmit=(e)=> {
        e.preventDefault()
        const studentUsername = this.refs.studentUsername.value;
        const marks = this.refs.marks.value;
        const assignmentName = this.refs.assignmentName.value;

        let isValid = false;

        this.state.submission.forEach( submission => {
            console.log(submission.studentUsername)
            if(submission.studentUsername==studentUsername){
                isValid =true
            }

        })

        if(isValid){
            console.log("valid")

            let data = {
                "assignmentName":assignmentName,
                "studentUsername":studentUsername,
                "instructorUsername":localStorage.getItem("username"),
                "mark":marks,

            }
            fetch('http://localhost:5000/api/marks',{
                method:"POST",
                body:JSON.stringify(data),
                headers:{"Content-Type" : "application/json"}
            }).then(res=>{
                return res.json();
            }).then( data => {
                console.log(data);
                console.log(data.marks)

                alert(`Student number with ${data.marks.studentUsername}  has been informed regarding the marks of ${data.marks.mark} for assignment  ${data.marks.assignmentName}`);

               this.setState({
                   studentUsername : '',
                   marks : ''
               })

            }).catch(err=>{
                console.log(`Error : ${err}`);
            })

        }else {
            this.setState({
                formErrors: { studentUsername : "Enter valid IT number from above list"}
            })
        }

    }

    componentDidMount() {
        fetch('http://localhost:5000/api/submission/'+this.props.assignmentName,{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data => {
                console.log(data.submission)
            this.setState({submission:data.submission})
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })
    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/><br/><br/><br/><br/>
                <h4 className="TextAlign font-weight-bold text-white">Submissions in  {this.props.assignmentName}</h4>

                <table className=" tableDisplay table table-hover border center">
                    <thead>
                    <th scope="col1">Submission ID</th>
                    <th scope="col1">Student IT number</th>
                    <th scope="col1">Date Submitted</th>
                    <th scope="col1">Download the file</th>



                    </thead>

                    <tbody>
                    {this.state.submission.map(submission=>{
                        // console.log(course)
                        return[
                            <tr>
                                <td>{submission._id}</td>
                                <td>{submission.studentUsername}</td>
                                <td>{submission.dateSubmitted}</td>
                                <td><a href={`http://localhost:5000/api/submission/file/${submission.fileName}`}>{submission.studentUsername + "-" + submission.assignmentName + "-" +submission.fileName}</a></td>


                                {/*disabled={!course.open} value={course.name} onClick={this.onViewAssignment}*/}
                            </tr>

                        ]
                    })}
                    </tbody>

                </table>
                    <br/><br/>
                <form className="borderStyle demoForm">


                    <br/>

                    <div className="form-group">
                        <label htmlFor="fullName">Student IT number</label>



                        <br/>
                        <input type="text"  className="form-control" name="studentUsername"
                               placeholder="Student IT number"
                               value={this.state.studentUsername}
                               onChange={this.handleUserInput}
                               ref="studentUsername"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.studentUsername}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Assignment Name</label>



                        <input type="text"  className="form-control" name="assignmentName"

                               value={this.state.assignmentName}

                               ref="assignmentName"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.assignmentName}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Marks</label>
                        <input required type="text"  className="form-control" name="marks"
                               placeholder="marks"
                               value={this.state.marks}
                               onChange={this.handleUserInput}
                               ref="marks"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.marks}</span>
                    </div>




                    <button type="submit" className="btn btn-primary TextAlign" disabled={!this.state.formValid} onClick={this.onSubmit}>Submit Marks</button>
                </form>
                
            </div>
        );
    }
}

export default InstructorViewSubmission;