import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import AdminLogin from "../admin/AdminLogin";
import InstructorLogin from "../instructor/InstructorLogin";
import StudentLogin from "../student/StudentLogin";




class Courseweb extends Component {

    directToAdminLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<AdminLogin/>,document.getElementById('root'))
    }

    directToInstructorLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<InstructorLogin/>,document.getElementById('root'))
    }

    directToStudentLogin = (e) => {
        e.preventDefault();
        ReactDOM.render(<StudentLogin/>,document.getElementById('root'))
    }


    render() {
        return (
            <div>
                <h2>Common Courseweb</h2>
                <button className="btn btn-secondary btn-outline-light m-5 " onClick={this.directToAdminLogin}> Admin</button>
                <button className="btn btn-secondary btn-outline-light m-5 " onClick={this.directToInstructorLogin}> Instructor</button>
                <button className="btn btn-secondary btn-outline-light m-5 " onClick={this.directToStudentLogin}> Student</button>
            </div>
        );
    }
}

export default Courseweb;