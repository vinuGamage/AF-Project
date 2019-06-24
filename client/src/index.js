import React from 'react';
import ReactDOM from 'react-dom';

// import App from './App';

import  Courseweb from './components/common/Courseweb'
import  CommonHome from './components/common/CommonHome'
import AdminLogin from "./components/admin/AdminLogin";
import InstructorLogin from "./components/instructor/InstructorLogin";
import StudentLogin from "./components/student/StudentLogin";


// ReactDOM.render(<Courseweb />, document.getElementById('root'));

if(localStorage.getItem('userType') == 'admin'){
    ReactDOM.render(<AdminLogin />, document.getElementById('root'));
}
if(localStorage.getItem('userType') == 'instructor'){
    ReactDOM.render(<InstructorLogin />, document.getElementById('root'));
}

if(localStorage.getItem('userType') == 'student'){
    ReactDOM.render(<StudentLogin />, document.getElementById('root'));
}


