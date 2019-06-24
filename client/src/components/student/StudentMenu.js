import React, {Component} from 'react';
import {Link} from "react-router-dom";

class StudentMenu extends Component {
    render() {
        return (
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div className="Menubar">
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/HomeStudent"> Student Home </Link>
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/NotificationStudent"> Notification </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/EnrolledCourses"> Enrolled Courses </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/OtherCourses"> Other Courses </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/SubmitAssignment"> Submit Assignments </Link>

                </div>
            </div>
        );
    }
}

export default StudentMenu;