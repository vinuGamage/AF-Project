import React, {Component} from 'react';
import '../../styles/common/Form.css';
import ReactDOM from "react-dom";
import StudentSignUp from "./StudentSignUp";
import AdminLogin from "../admin/AdminLogin";
import InstructorLogin from "../instructor/InstructorLogin";
import  CommonHome from "../common/CommonHome";

class StudentLogin extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            formErrors: {username: '', password: '',invalidCredentials: ''},
            usernameValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
                usernameValid = value.length >= 1;
                fieldValidationErrors.username = usernameValid ? '' : 'Username is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    directToSignup = (e) => {
        e.preventDefault();
        ReactDOM.render(<StudentSignUp/>,document.getElementById('root'))
    }

    directToAdminLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<AdminLogin/>,document.getElementById('root'))
    }

    directToInstructorLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<InstructorLogin/>,document.getElementById('root'))
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    onSubmit=(e)=>{
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        let credentials = {
            "username":username,
            "password":password
        }
        let count=false;

        fetch('http://localhost:5000/api/student/' + credentials.username +'/' +credentials.password,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            let student = JSON.stringify(data.student);

            if (student!='[]') {
                console.log(student);
                count = true;

                // console.log(data);
                this.setState({
                    formErrors: { invalidCredentials : ""}
                })

                count = true;
                localStorage.setItem("userType", "student")
                localStorage.setItem("username",data.student[0].username );
                localStorage.setItem("securityQuestion",data.student[0].securityQuestion );
                localStorage.setItem("securityAnswer",data.student[0].securityAnswer );
                localStorage.setItem("fullname",data.student[0].fullName );
                localStorage.setItem("email",data.student[0].email );
                localStorage.setItem("phone",data.student[0].phone );


                ReactDOM.render(<CommonHome/>,document.getElementById('root'))

            }else {

                this.refs.username.value = ""
                this.refs.password.value = ""

                this.setState({
                    formErrors: { invalidCredentials : "Username or Password is Incorrect"}
                })
                console.log(this.state.formErrors)

            }
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })
    }

    reset = (e) =>{
        e.preventDefault();
        this.refs.username.value = "";
        this.refs.password.value = "";
    }

    render() {
        return (
            <div className="backgroundImage" >
                <br/><br/><br/><br/> <br/><br/> <br/><br/>
                <form className="demoForm borderStyle">

                    <h3 className="display-4 m-2 align-items-center align-content-center">Student Login</h3>
                    <span className="help-block font-italic text-danger">{this.state.formErrors.invalidCredentials}</span>

                    <br/>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="email" required className="form-control" name="username"
                               placeholder="Username"
                               value={this.state.username}
                               onChange={this.handleUserInput}
                               ref="username"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.username}</span>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handleUserInput}
                               ref="password"

                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.password}</span>
                    </div>
                    <button type="submit" className="btn btn-primary  m-2" disabled={!this.state.formValid} onClick={this.onSubmit}>Sign In</button>
                    <button type="reset" onClick={this.reset} className="btn btn-primary btn-outline-light m-2"  >Reset</button>
                    <button  className="btn btn-primary btn-outline-light m-2"  onClick={this.directToSignup}>Create New Account</button>

                    <button  className="btn btn-primary btn-outline-light mr-1"  onClick={this.directToAdminLogin}>Admin Login</button>
                    <button  className="btn btn-primary btn-outline-light "  onClick={this.directToInstructorLogin}>Instructor Login</button>

                </form>
            </div>

        );
    }
}

export default StudentLogin;