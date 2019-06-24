import React, {Component} from 'react';
import ReactDOM from "react-dom";
import StudentLogin from "../student/StudentLogin";

class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {

            fullName: localStorage.getItem("fullname"),
            securityQuestion: localStorage.getItem("securityQuestion"),
            securityAnswer: localStorage.getItem("securityAnswer"),
            phone: localStorage.getItem("phone"),
            email: localStorage.getItem("email"),
            isUpdate: false,
            formErrors: {
                email: '',
                securityQuestion: '',
                securityAnswer: '',
                phone: '',
                fullName: ''

            },

            securityQuestionValid: true,
            securityAnswerValid: true,
            phoneValid: true,
            fullNameValid: true,
            emailValid: true,
            formValid: true

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
        let securityQuestionValid = this.state.securityQuestionValid;
        let securityAnswerValid = this.state.securityAnswerValid;
        let phoneValid = this.state.phoneValid;
        let fullNameValid = this.state.fullNameValid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {

            case 'securityQuestion':
                securityQuestionValid = value.length >= 6;
                fieldValidationErrors.securityQuestion = securityQuestionValid ? '': 'Security Question is invalid (Min - 6 Characters)';
                break;

            case 'securityAnswer':
                let letterNumber = /^[0-9a-zA-Z]+$/;
                securityAnswerValid = value.length >= 1
                fieldValidationErrors.securityAnswer = securityAnswerValid ? '': 'Security Answer is invalid';
                break;

            case 'phone':
                phoneValid = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i);
                fieldValidationErrors.phone = phoneValid ? '': 'Phone Number is invalid';
                break;

            case 'fullName':
                let letters = /^[A-Za-z]+$/;
                fullNameValid = value.length >= 1 && value.match(/^[a-zA-Z_ ]*$/);
                fieldValidationErrors.fullName = fullNameValid ? '': 'Full Name is invalid';
                break;

            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' Email is invalid';
                break;

            default:
                break;

        }

        this.setState({
            formErrors:fieldValidationErrors,
            securityQuestionValid:securityQuestionValid,
            securityAnswerValid:securityAnswerValid,
            phoneValid:phoneValid,
            fullNameValid:fullNameValid,
            emailValid:emailValid
        },this.validateForm);

    }

    validateForm(){
        this.setState({formValid: this.state.securityQuestionValid &&  this.state.securityAnswerValid && this.state.phoneValid  && this.state.fullNameValid  && this.state.emailValid});
        // console.log(this.state.formValid);
    }


    // onUpdate=(e)=>{
    //     e.preventDefault();
    //
    //     fetch('',{
    //         method:"PUT",
    //         body:JSON.stringify(data),
    //         headers:{"Content-Type":"application/json"}
    //     }).then(res=>{
    //         return res.json();
    //     }).then(data=>{
    //         console.log(data);
    //         alert(`Information was successfully updated`);
    //     });
    // }

    updateVisible = (e) =>{
        this.setState({
            isUpdate : true
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();

        const fullName = this.refs.fullName.value;

        const securityQuestion=this.refs.securityQuestion.value;
        const securityAnswer = this.refs.securityAnswer.value;
        const phone = this.refs.phone.value;
        const email=this.refs.email.value;

        let data = {
            "fullName":fullName,
            "securityQuestion":securityQuestion,
            "securityAnswer":securityAnswer,
            "phone":phone,
            "email":email
        }
        fetch('http://localhost:5000/api/student/'+ localStorage.getItem('username'),{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);

            console.log(data.updatedObject)

            alert("Please Re-Login to the portal")

            localStorage.clear()
            window.location.replace("/")
            localStorage.setItem("userType", "student")
            ReactDOM.render(<StudentLogin/>,document.getElementById('root'))

            // this.props.history.push('/CreateInstructor')
            // browserHistory.push('/CreateInstructor')

            // window.location.replace("http://localhost:3000/CreateInstructor")

            // browserHistory.goBack()

            // const { history } = this.props;
            // history.push("/CreateInstructor")

            // const history = createHashHistory()
            // history.push("/CreateInstructor")
        }).catch(err=>{
            console.log(`Error : ${err}`);
        });


    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/>
                <h2 className="TextAlign font-weight-bold text-white"> Welcome To Your Profile {this.state.fullName}!! </h2>

                <table className="tableDisplay  table table-hover border center">
                    <tbody>
                    <tr>
                        <td>Full Name</td>
                        <td>{this.state.fullName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.state.email}</td>
                    </tr>
                    <tr>
                        <td>Phone No</td>
                        <td>{this.state.phone}</td>
                    </tr>

                    <tr>
                        <td>Security Question</td>
                        <td>{this.state.securityQuestion}</td>
                    </tr>
                    <tr>
                        <td>Security Answer </td>
                        <td>{this.state.securityAnswer}</td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><div className="form-group align-content-center">

                            <input onClick={this.updateVisible} type="submit" className="btn btn-success  TextAlign ml-5 align-content-center" value="Update Profile" />
                        </div></td>
                    </tr>

                    </tbody>

                </table>
                <br/>
                {this.state.isUpdate ? <div>

                    <form className="borderStyle demoForm">

                        <h3 className="display-4 TextAlign">Update Profile</h3>


                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text"  className="form-control" name="fullName"
                                   placeholder="Full Name"
                                   value={this.state.fullName}
                                   onChange={this.handleUserInput}
                                   ref="fullName"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.fullName}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text"  className="form-control" name="phone"
                                   placeholder="Phone"
                                   value={this.state.phone}
                                   onChange={this.handleUserInput}
                                   ref="phone"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.phone}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"  className="form-control" name="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleUserInput}
                                   ref="email"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.email}</span>
                        </div>





                        <div className="form-group">
                            <label htmlFor="securityQuestion">Security Question</label>
                            <input type="text"  className="form-control" name="securityQuestion"
                                   placeholder="Security Question"
                                   value={this.state.securityQuestion}
                                   onChange={this.handleUserInput}
                                   ref="securityQuestion"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.securityQuestion}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="securityAnswer">Security Answer</label>
                            <input type="text"  className="form-control" name="securityAnswer"
                                   placeholder="Security Answer"
                                   value={this.state.securityAnswer}
                                   onChange={this.handleUserInput}
                                   ref="securityAnswer"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.securityAnswer}</span>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} onClick={this.onSubmit}>Update Profile</button>
                    </form>

                </div>: <div></div>}
            </div>
        );
    }
}

export default StudentProfile;