import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AdminMenu extends Component {
    render() {
        return (
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div className="Menubar">
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/HomeAdmin"> Admin Home </Link>
                    <Link className ="btn btn-secondary  mr-3 ml-3 mt-2 mb-2" to="/CreateAdmin"> Create New Admin </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/CreateInstructor"> Create New Instructor </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/CreateCourse"> Create New Course </Link>
                    <Link className ="btn btn-secondary mr-3 ml-3 mt-2 mb-2" to="/AllNotifications"> Check All Notifications </Link>
                </div>
            </div>
        );
    }
}

export default AdminMenu;