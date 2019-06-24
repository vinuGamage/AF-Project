import React, {Component} from 'react';
import {Link} from "react-router-dom";

class InstructorMenu extends Component {
    render() {
        return (
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div className="Menubar">
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/HomeInstructor"> Instrcutor Home </Link>
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/NotificationInstructor"> Notification </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/CourseInstructor"> View Courses </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/CreateAssignmentInstructor"> Create Assignment </Link>

                </div>
            </div>
        );
    }
}

export default InstructorMenu;