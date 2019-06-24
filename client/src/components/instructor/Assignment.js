import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';
import {Link} from "react-router-dom";

const moment = require("moment")
class Assignment extends Component {

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


    onUpdate = (e) =>{
        e.preventDefault()
        let name = e.target.name.replace(/\s/g, '');
        console.log(name)


        if(this.refs[name].value =='') {
            alert("You cant keep the  date field blank")

        }else {
            if((moment(this.refs[name].value).diff(moment(),"days") +1) < 2){
                alert("Please enter a future date")
            }
            else{

                fetch('http://localhost:5000/api/assignment/'+ e.target.name + "/" +this.refs[name].value,{
                    method:"PUT",
                    headers:{"Content-Type" : "application/json"}
                }).then(res=>{
                    return res.json();
                }).then( data => {

                    console.log(data)

                    alert("Successfully updated the date for assignment "+ name)
                }).catch(err=>{
                    console.log(`Error : ${err}`);
                })
            }

        }

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
                    <th scope="col1">View Submissions</th>
                    <th scope="col1">Select Date</th>
                    <th scope="col1">Update</th>



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
                                <td><Link className="btn btn-secondary" to={'/viewSubmissions/' + assignment.name}  disabled  >
                                    View Submissions

                                </Link></td>

                                <td>
                                    <input type="date"  className="form-control" name={assignment.name}
                                           placeholder="Enrollment Key"
                                        // onChange={this.handleUserInput}

                                           ref={assignment.name.replace(/\s/g, '')}
                                    />


                                </td>


                                <td><button className="btn btn-secondary" name={assignment.name}  onClick={this.onUpdate}> Update </button> </td>


                            </tr>

                        ]
                    })}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default Assignment;