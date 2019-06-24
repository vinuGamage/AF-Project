import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';

class StudentOtherCourse extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            courses : [],
            enrollmentKey : ""
        })

    }

    // handleUserInput = (e) => {
    //
    //     // const value = e.target.value;
    //     const name = e.target.name
    //     // this.setState( {
    //     //     enrollmentKey : value
    //     // });
    //     console.log(name)
    //
    // }

    onEnroll = (e) => {
        e.preventDefault()
        let courseName = e.target.name;


        console.log(courseName)

        let name = e.target.name.replace(/\s/g, '');
        console.log(name)

        // console.log(name.replace(/\s/g, ''))
        console.log(this.refs[name].value)

        if(this.refs[name].value =='') {
            alert("You cant keep the enrollment field blank")

        }

        else{

            // http://localhost:5000/api/student/IT17137492/Cyber Security/1234



            fetch('http://localhost:5000/api/student/'+ localStorage.getItem("username") + "/" + courseName + "/" +this.refs[name].value,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"}
            }).then(res=>{
                return res.json();
            }).then(data=>{

                console.log(data)
                console.log(data.course)
                console.log(data.course.n)
                if(data.course.n != 0 ){
                    alert("Successfully enrolled to course " +courseName )

                }

                else {
                    alert("Enrollment key  for course " +courseName+  "is invalid"  )
                }
            }).catch(err=>{
                console.log(`Error : ${err}`);
            })
        }



    }

    componentDidMount() {
        fetch('http://localhost:5000/api/student/' + localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then( data => {
            console.log(data.student[0].coursesNameArray)
            let courseNameArray = data.student[0].coursesNameArray; //enrolled courses


            fetch('http://localhost:5000/api/course',{
                method :'GET',
                headers:{'Content-Type' : 'application/json'}
            }).then(res=>{
                return res.json();
            }).then(data => { // all courses

                let courseArray = [];


                    data.courses.forEach( course => {
                        courseArray.push(course.name)
                    })
                console.log(courseArray) // all courses
                let displayCourse = courseArray;
                courseNameArray.forEach( enrolledCourse => {
                    courseArray.forEach( allCourse => {
                        if(enrolledCourse == allCourse){

                            displayCourse.splice(displayCourse.indexOf(allCourse),1)
                           // console.log (displayCourse.indexOf(allCourse))
                        }
                    })
                })

                console.log(displayCourse) // unenrolled courses

                let CourseObjectArray = []
                displayCourse.forEach( val => {
                    fetch('http://localhost:5000/api/course/' + val,{
                        method:"GET",
                        headers:{"Content-Type" : "application/json"}
                    }).then(res=>{
                        return res.json();
                    }).then(data=>{
                        console.log(data.course[0].open)

                        if(data.course[0].open){ // checking whether the course is accepted or not
                            CourseObjectArray.push(data.course[0])
                        }


                        console.log(data.course[0])
                    }).catch(err=>{
                        console.log(`Error : ${err}`);
                    })
                })





                setTimeout( ()=> {
                    this.setState({
                        courses : CourseObjectArray
                    })
                    console.log(this.state.courses)
                },3000)

                // console.log(data)
            }).catch(   err=>{
                console.log(`Error : ${err}`);
            })



        }).catch(err=>{
            console.log(`Error : ${err}`);
        })
    }


    render() {
        return (
            <div className="backgroundImageWithMargin">

                <br/>
                <h4 className="TextAlign font-weight-bold text-white">Courses Available to enroll</h4>
                <table className="tableDisplay table table-hover border center">
                    <thead>
                    <th scope="col1">Course Name</th>
                    <th scope="col1">Credits</th>


                    <th scope="col1">Enter enrollment key</th>
                    <th scope="col1">Enroll</th>


                    </thead>

                    <tbody>
                    {this.state.courses.map(course=>{
                        // console.log(course)
                        return[
                            <tr>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>
                                <td>


                                        <input type="text"  className="form-control" name={course.name}
                                                placeholder="Enrollment Key"
                                               // onChange={this.handleUserInput}

                                                ref={course.name.replace(/\s/g, '')}
                                    />


                                </td>


                                <td><button className="btn btn-secondary" name={course.name}  onClick={this.onEnroll}> Enroll </button>
                                </td>
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

export default StudentOtherCourse;