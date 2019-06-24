import React, {Component} from 'react';
import '../../styles/common/Form.css';
import ReactDOM from "react-dom";
import InstructorLogin from "../instructor/InstructorLogin";
import StudentLogin from "../student/StudentLogin";

import  CommonHome from "../common/CommonHome";

// import AdminCreation from "./AdminCreation";

class AdminLogin extends Component {

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
                fieldValidationErrors.username = usernameValid ? '' : ' Username is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' Password is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    // directToSignup = (e) => {
    //     e.preventDefault();
    //     ReactDOM.render(<AdminCreation/>,document.getElementById('root'))
    // }

    directToInstructorLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<InstructorLogin/>,document.getElementById('root'))
    }

    directToStudentLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<StudentLogin/>,document.getElementById('root'))
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

        fetch('http://localhost:5000/api/admin/' + credentials.username +'/' +credentials.password,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            let admin = JSON.stringify(data.admins);

            if (admin!='[]') {
                // console.log(data);
                this.setState({
                    formErrors: { invalidCredentials : ""}
                })

                count = true;
                // console.log(data.admins[0].username)
                localStorage.setItem("userType", "admin")
                localStorage.setItem("username",data.admins[0].username );
                localStorage.setItem("securityQuestion",data.admins[0].securityQuestion );
                localStorage.setItem("securityAnswer",data.admins[0].securityAnswer );
                localStorage.setItem("fullname",data.admins[0].fullName );
                localStorage.setItem("email",data.admins[0].email );
                localStorage.setItem("phone",data.admins[0].phone );




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

                <form className="demoForm borderStyle ">

                    <h3 className="display-4 m-2 align-items-center align-content-center">Admin Login</h3>
                    <span className="help-block font-italic text-danger">{this.state.formErrors.invalidCredentials}</span>
                    <br/>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" required className="form-control" name="username"
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
                    <button type="submit" className="btn btn-primary mr-1 " disabled={!this.state.formValid} onClick={this.onSubmit}>Sign In</button>
                    <button type="reset" onClick={this.reset} className="btn btn-primary btn-outline-light mr-1 "  >Reset</button>

                    <button  className="btn btn-primary btn-outline-light mr-1"  onClick={this.directToInstructorLogin}>Instructor Login</button>
                    <button  className="btn btn-primary btn-outline-light "  onClick={this.directToStudentLogin}>Student Login</button>

                    {/*<button  className="btn btn-primary btn-outline-light m-2"  onClick={this.directToSignup}>Create New Account</button>*/}
                </form>
            </div>

        );
    }
}

export default AdminLogin;