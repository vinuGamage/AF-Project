import React, {Component} from 'react';
import '../../styles/common/Form.css';


class CourseCreation extends Component {

    constructor(props){
        super(props);

        this.state={
            name:'',
            credits:'',
            enrollmentKey:'',
            instructorArray:'',
            instructors:[],
            formErrors:{
                name:'',
                credits:'',
                enrollmentKey:'',
                instructorArray:''
            },
            nameValid:false,
            creditsValid:false,
            enrollmentKeyValid:false,
            instructorArrayValid:false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let nameValid= this.state.nameValid;
        let creditsValid= this.state.creditsValid;
        let enrollmentKeyValid= this.state.enrollmentKeyValid;
        let instructorArrayValid= this.state.instructorArrayValid;


        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '': 'Course Name is invalid';
                break;

            case 'credits':
                creditsValid = value.length >= 1 && value.match(/^\d+$/);
                fieldValidationErrors.credits = creditsValid ? '': 'Credits is invalid';
                break;

            case 'enrollmentKey':
                enrollmentKeyValid = value.length >= 1;
                fieldValidationErrors.enrollmentKey = enrollmentKeyValid ? '': 'Enrollment Key is invalid';
                break;

            case 'instructorArray':
                let letterNumber = /^[0-9a-zA-Z]+$/;
                instructorArrayValid = value.length >= 1;
                fieldValidationErrors.instructorArray = instructorArrayValid ? '': 'Field is invalid';
                break;

            default:
                break;

        }

        this.setState({
            formErrors:fieldValidationErrors,
            nameValid:nameValid,
            creditsValid:creditsValid,
            enrollmentKeyValid:enrollmentKeyValid,
            instructorArrayValid:instructorArrayValid

        },this.validateForm);

    }

    validateForm(){
        this.setState({formValid:this.state.nameValid && this.state.creditsValid && this.state.enrollmentKeyValid &&  this.state.instructorArrayValid });
        console.log(this.state.formValid);
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/instructor',{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{
            this.setState({instructors:data.instructors});
            console.log(this.state.instructors)
        }).catch(err=>{
            console.log(`Error : ${err}`);
        })

    }

    onSubmit=(e)=>{
        e.preventDefault();

        const name = this.refs.name.value;
        const credits= this.refs.credits.value;
        const enrollmentKey= this.refs.enrollmentKey.value;
        const instructorArray= this.refs.instructorArray.value;



            console.log(name);
            console.log(credits);
            console.log(enrollmentKey);
            console.log(instructorArray);


        fetch('http://localhost:5000/api/course/' + name,{
            method :'GET',
            headers:{'Content-Type' : 'application/json'}
        }).then(res=>{
            return res.json();
        }).then(data => {

            let course = JSON.stringify(data.course);
            console.log(course);

            if (course != '[]') {
                this.setState({
                    formErrors: { name : "Course Name is already in use please select another"}
                })
            }else{
                console.log("Course name is unique")

                let validationArray = [];

                instructorArray.split(",").forEach( val => {
                    console.log(val)
                    validationArray.push(val)
                    this.state.instructors.map( instructor => {

                        console.log(instructor.username)
                            if(instructor.username == val){
                                validationArray.pop()
                            }else{

                            }
                    })
                })
                console.log(validationArray.length)
                if(validationArray.length > 0){
                    this.setState({
                        formErrors: { instructorArray : "Enter the instructor username properly, check for commas"}
                    })
                }else{
                    console.log("validated")

                    let data = {
                        "name":name,
                        "credits":credits,
                        "enrollmentKey":enrollmentKey,
                        "instructorUsernameArray":instructorArray
                    }

                    fetch('http://localhost:5000/api/course',{
                        method:"POST",
                        body:JSON.stringify(data),
                        headers:{"Content-Type" : "application/json"}
                    }).then(res=>{
                        return res.json();
                    }).then(data=>{
                        console.log(data.addedObject);
                        alert(`Course ${data.addedObject.name} was successfully added`);

                        this.setState({
                            name:'',
                            credits:'',
                            enrollmentKey:'',
                            instructorArray:''
                        })
                    }).catch(err=>{
                        console.log(`Error : ${err}`);
                    });

                }

            }


        }).catch(err=>{
            console.log(`Error : ${err}`);
        });




    }

    render() {
        return (
            <div className="backgroundImageWithMargin">
                <br/><br/> <br/><br/>
                <form className="demoForm borderStyle">

                    <h3 className="display-4">Course Creation</h3>


                    {/*<table className="table">*/}
                        {/*<thead>*/}
                        {/*<th scope="col1">#Instructor ID</th>*/}
                        {/*<th scope="col1">Instructors' Fullname</th>*/}
                        {/*<th scope="col1">Instructors' E-mail</th>*/}
                        {/*</thead>*/}

                        {/*<tbody>*/}
                        {/*{this.state.instructors.map(instructor=>{*/}
                            {/*return[*/}
                                {/*<tr>*/}
                                    {/*<td>{instructor._id}</td>*/}
                                    {/*<td>{instructor.fullName}</td>*/}
                                    {/*<td>{instructor.email}</td>*/}
                                {/*</tr>*/}

                            {/*]*/}
                        {/*})}*/}
                        {/*</tbody>*/}

                    {/*</table>*/}

                    <br/>

                    <div className="form-group">
                        <label htmlFor="name">Course Name</label>
                        <input type="text"  className="form-control" name="name"
                               placeholder="Course Name"
                               value={this.state.name}
                               onChange={this.handleUserInput}
                               ref="name"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.name}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="credits">Credits</label>
                        <input type="text"  className="form-control" name="credits"
                               placeholder="Credits"
                               value={this.state.credits}
                               onChange={this.handleUserInput}
                               ref="credits"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.credits}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="enrollmentKey">Course Enrollment Key</label>
                        <input type="text"  className="form-control" name="enrollmentKey"
                               placeholder="Enrollment Key"
                               value={this.state.enrollmentKey}
                               onChange={this.handleUserInput}
                               ref="enrollmentKey"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.enrollmentKey}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructorArray">Instructor Usernames</label>

                        {this.state.instructors.map(instructor=>{
                            return[
                                <li>{instructor.username}</li>
                            ]
                        })}
                        <br/>
                        <input type="text"  className="form-control" name="instructorArray"
                               placeholder="username1,username2"
                               value={this.state.instructorArray}
                               onChange={this.handleUserInput}
                               ref="instructorArray"
                        />
                        <span className="help-block font-italic text-danger">{this.state.formErrors.instructorArray}</span>
                    </div>



                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} onClick={this.onSubmit}>Create Course</button>
                </form>
            </div>

        );
    }
}

export default CourseCreation;