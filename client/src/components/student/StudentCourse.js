import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';
import {Link} from "react-router-dom";


class StudentCourse extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            courses : []
        })

    }

    componentDidMount() {

        fetch('http://localhost:5000/api/student/' + localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log("mount")
            console.log(data.student[0].coursesNameArray)

            let courseArray = data.student[0].coursesNameArray
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


    render() {
        return (
            <div className="backgroundImageWithMargin">

                <br/>
                <h4 className="TextAlign font-weight-bold text-white">Courses you have been Enrolled</h4>
                <table className=" tableDisplay  table table-hover border center">
                    <thead>
                    <th scope="col1">Course Name</th>
                    <th scope="col1">Credits</th>


                    <th scope="col1">View Assignments</th>


                    </thead>

                    <tbody>
                    {this.state.courses.map(course=>{
                        // console.log(course)
                        return[
                            <tr>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>


                                <td><Link className="btn btn-secondary" to={'/studentSpecificAssignments/' + course.name}  disabled  >
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

export default StudentCourse;