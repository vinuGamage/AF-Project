import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';
import {Link} from "react-router-dom";
class InstructorCourse extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            courses : []
        })

    }


    componentDidMount() {

        fetch('http://localhost:5000/api/instructor/' + localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log("mount")
            console.log(data.instructor[0].coursesNameArray)

           let courseArray = data.instructor[0].coursesNameArray
            let CourseObjectArray = [];
            if(courseArray.length != 0) {
                console.log("true")


                courseArray.forEach( val => {
                    fetch('http://localhost:5000/api/course/' + val,{
                        method:"GET",
                        headers:{"Content-Type" : "application/json"}
                    }).then(res=>{
                        return res.json();
                    }).then(data=>{
                        CourseObjectArray.push(data.course[0])
                        console.log(data.course[0])
                    }).catch(err=>{
                        console.log(`Error : ${err}`);
                    })
                })

            }
            else {
                console.log("false")

            }

            console.log(CourseObjectArray)

            setTimeout( ()=> {
                this.setState({
                    courses : CourseObjectArray
                })
                console.log(this.state.courses)
            },3000)




        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

    }

    onViewAssignment = (e) => {
        e.preventDefault()
        console.log(e.target.value)

        localStorage.setItem("courseName",e.target.value )
    }


    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/>
                <table className="tableDisplay table table-hover border center">
                    <thead>
                    <th scope="col1">Course Name</th>
                    <th scope="col1">Credits</th>
                    <th scope="col1">Enrollment Key</th>
                    <th scope="col1">Active</th>
                    <th scope="col1">View Assignments</th>


                    </thead>

                    <tbody>
                    {this.state.courses.map(course=>{
                        // console.log(course)
                        return[
                            <tr>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>
                                <td>{course.enrollmentKey}</td>
                                <td>{course.open.toString()}</td>

                                <td><Link className="btn btn-secondary" to={'/specificAssignments/' + course.name}  disabled  >
                                    View Assignment

                                </Link></td>
                                {/*disabled={!course.open} value={course.name} onClick={this.onViewAssignment}*/}
                            </tr>

                        ]
                    })}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default InstructorCourse;