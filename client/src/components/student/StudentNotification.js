import React, {Component} from 'react';
import '../../styles/common/Form.css';
import '../../styles/common/Table.css';


class StudentNotification extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            notifications : []
        })
    }



    componentDidMount() {

        fetch('http://localhost:5000/api/notification/' + localStorage.getItem("username"), {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            return res.json();
        }).then(data => {
            this.setState({notifications: data.notification});
            console.log(this.state.notifications)
        }).catch(err => {
            console.log(`Error : ${err}`);
        })

    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/>
                <table className=" tableDisplay table table-hover border center">
                    <thead>
                    <th scope="col1">NotificationId</th>
                    <th scope="col1">From</th>
                    <th scope="col1">To</th>
                    <th scope="col1">Action</th>
                    <th scope="col1">Date</th>
                    </thead>

                    <tbody>
                    {this.state.notifications.map(notification=>{
                        return[
                            <tr>
                                <td>{notification._id}</td>
                                <td>{notification.from}</td>
                                <td>{notification.to}</td>
                                <td>{notification.action}</td>
                                <td>{notification.date}</td>

                            </tr>

                        ]
                    })}
                    </tbody>

                </table>

            </div>
        );
    }

}
export default StudentNotification;