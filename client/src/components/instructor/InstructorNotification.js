import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';

class InstructorNotification extends Component {


    constructor(props) {
        super(props)

        this.state = ({
            notifications : []
        })
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/notification/' + localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            this.setState({notifications:data.notification});
            console.log(this.state.notifications)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

    }


    onAccept = (e) => {
        e.preventDefault()
        let data = e.target.value.split(",")
        console.log(data[0])
        console.log(data[1])

        fetch('http://localhost:5000/api/course/' + data[0],{
            method:"PUT",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{

            console.log(data.courses.n)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

        fetch('http://localhost:5000/api/notification/' + data[1],{
            method:"DELETE",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{

            console.log(data.notification.n)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

        alert("Course has been put to open state where students can enroll")


    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/>
                <table className=" tableDisplay table table-hover border center">
                    <thead>
                    <th scope="col1">NotificationId</th>
                    <th scope="col1">From</th>
                    <th scope="col1">Message</th>
                    <th scope="col1">Date</th>
                    <th scope="col1">Course Name</th>
                    <th scope="col1">Action</th>

                    </thead>

                    <tbody>
                    {this.state.notifications.map(notification=>{
                        return[
                            <tr>
                                <td>{notification._id}</td>
                                <td>{notification.from}</td>
                                <td>{notification.action}</td>
                                <td>{notification.date}</td>
                                <td>{notification.courseName}</td>
                                <td><button className="btn btn-secondary" onClick={this.onAccept} value={notification.courseName +","+ notification._id}>Accept</button></td>

                            </tr>

                        ]
                    })}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default InstructorNotification;