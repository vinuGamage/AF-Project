import React, {Component} from 'react';
import AdminMenu from "./CommonHome";
import AdminProfile from "../admin/AdminProfile";
import InstructorProfile from "../instructor/InstructorProfile";
import StudentProfile from "../student/StudentProfile";

class Profile extends Component {

    constructor(props){
        super(props);
        this.state  ={
            isAdmin : localStorage.getItem("userType") == "admin",
            // isAdmin : true,

            isInstructor : localStorage.getItem("userType") == "instructor",
            // isInstructor : true,
            isStudent : localStorage.getItem("userType") == "student"
            // isStudent : true


        }


    }

    render() {
        return (
            <div>


                {
                    this.state.isAdmin ? <AdminProfile/>  : " "
                }
                {
                    this.state.isInstructor ? <InstructorProfile/> : ""
                }
                {
                    this.state.isStudent ? <StudentProfile/> : ""
                }

            </div>
        );
    }
}

export default Profile;