import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';
import {Link} from "react-router-dom";

const moment = require("moment")
class StudentAssignment extends Component {

    constructor (props){
        super (props);
        console.log(this.props)
        this.state = {
            assignment : []
        }
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/assignment/course/'+this.props.courseName,{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{

            console.log(data.assignment)
            this.setState({
                assignment : data.assignment
            })

            console.log(this.state.assignment)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/>
                <h4 className="TextAlign font-weight-bold bg-light">Assignment in  {this.props.courseName}</h4>


                <table className=" tableDisplay  table table-hover border center">
                    <thead>
                    <th scope="col1">AssignmentId</th>
                    <th scope="col1">Assignment Name</th>
                    <th scope="col1">Instructor Created</th>
                    <th scope="col1">Due Date</th>
                    <th scope="col1">Days Remaining</th>



                    </thead>

                    <tbody>
                    {this.state.assignment.map(assignment=>{
                        return[
                            <tr>
                                <td>{assignment._id}</td>
                                <td>{assignment.name}</td>
                                <td>{assignment.instructorUsername}</td>
                                <td>{assignment.dueDate}</td>
                                <td>{moment(assignment.dueDate).diff(moment(),"days") +1}</td>



                            </tr>

                        ]
                    })}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default StudentAssignment;