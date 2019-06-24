import React, {Component} from 'react';

class SubmitAssignment extends Component {

    constructor(props){
        super(props);

        this.state={
            name:'',
            username:localStorage.getItem("username"),
            file :'',


            formErrors:{
                name:'',
                username:'',
                file:''
            },
            nameValid:false,
            fileValid:false,


            assignment : []
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
        let nameValid = this.state.nameValid;
        let fileValid = this.state.fileValid;



        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 1;
                fieldValidationErrors.name = nameValid ? '': 'Assignment name is invalid';
                break;

            case 'file':
                fileValid = value.length >= 1;
                fieldValidationErrors.file = fileValid ? '': 'Upload a file';
                break;


            default:
                break;

        }

        this.setState({
            formErrors:fieldValidationErrors,
            nameValid:nameValid,
            fileValid:fileValid
        },this.validateForm);

    }

    validateForm(){
        this.setState({formValid:this.state.nameValid && this.state.fileValid });
        // console.log(this.state.formValid);
    }


    componentDidMount() {
        let assignmentArray = []
        fetch('http://localhost:5000/api/student/'+localStorage.getItem("username"),{
            method:"GET",
            headers:{"Content-Type" : "application/json"}
        }).then(res=>{
            return res.json();
        }).then(data=>{


            let courseArray = data.student[0].coursesNameArray //all the courses student has enrolled

            console.log(courseArray)
            // localhost:5000/api/assignment/course/:courseName
            courseArray.forEach (course => {
                console.log(course)

                fetch('http://localhost:5000/api/assignment/course/'+course,{
                    method:"GET",
                    headers:{"Content-Type" : "application/json"}
                }).then(res=>{
                    return res.json();
                }).then( data => {
                    console.log(data.assignment)

                    data.assignment.forEach( assignment => {
                            assignmentArray.push(assignment.name)
                    })

                }).catch(err=>{
                    console.log(`Error : ${err}`);
                })


            })

        }).catch(err=>{
            console.log(`Error : ${err}`);
        })


        setTimeout( () => {
            this.setState({
                assignment :assignmentArray
            })
        },1000)



    }
//onchange for files
    getFile =(e) => {
        e.preventDefault();
        console.log(e.target.name)
        console.log(e.target.value)

        let name  =e.target.name
        let value =e.target.value

        this.setState({
            fileValid : true
        },() => { this.validateField(name, value)})

        this.setState({
            file : e.target.files[0]
        })
        console.log(this.state.file)



    }

    onSubmit = (e) => {
        e.preventDefault()
        const name = this.refs.name.value;
        const username = this.refs.username.value;
        const fileName=  this.refs.fileName.value;

        console.log(name)
        console.log(username)
        console.log(fileName)

        let isValid = false

        this.state.assignment.forEach( assignment => {
            if(assignment == name) {
                isValid = true
            }
        })

        if(isValid){
            console.log("valid")


            const data = new FormData()

            console.log(this.state.file)

            data.append('file', this.state.file)

            const options = {
                method: 'POST',
                body: data,
                // If you add this, upload won't work
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            delete options.headers['Content-Type']; // recreate the content header according to the file

            fetch("http://localhost:5000/api/submission/file",options
            ).then( res => {
                return res.json()
            }).then( data => {
                let fileName = data.file.filename
                console.log(data.file.filename)
                if(fileName != ''){

                    let data = {
                        "assignmentName": name,
                        "studentUsername":localStorage.getItem("username"),
                        "fileName":fileName
                    }
                    fetch('http://localhost:5000/api/submission',{
                        method:"POST",
                        body:JSON.stringify(data),
                        headers:{"Content-Type" : "application/json"}
                    }).then(res=>{
                        return res.json();
                    }).then(data=>{
                        console.log(data);
                            alert(`Your file was successfully submitted`)
                        this.setState({
                            name:'',
                            username:localStorage.getItem("username"),
                            file :''
                        })

                    }).catch(err=>{
                        console.log(`Error : ${err}`);
                    });
                }

            }).catch(err => {
                console.log(err)
            })


        }else{
            this.setState({
                formErrors: { name : "Please enter valid assignment name from the above list"}
            })
        }


    }

    render() {
        return (
            <div>
                <div className="backgroundImageWithMargin" >
                    <br/><br/><br/><br/><br/><br/>
                    <form className="borderStyle demoForm">

                        <p className="display-4 TextAlign">Submit Assignment</p>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="fullName">Assignment Name</label>

                            {this.state.assignment.map(assignment=>{
                                return[
                                    <li>{assignment}</li>
                                ]
                            })}

                            <br/>
                            <input type="text"  className="form-control" name="name"
                                   placeholder="Assignment Name"
                                   value={this.state.name}
                                   onChange={this.handleUserInput}
                                   ref="name"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.name}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Student Username</label>



                            <input type="text"  className="form-control" name="username"

                                   value={this.state.username}

                                   ref="username"
                            />
                            <span className="help-block font-italic text-danger">{this.state.formErrors.courseName}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Upload File</label>
                            <input required type="file"  className="form-control-file" name="file"
                                   placeholder="Instructor Username"
                                   onChange={this.getFile}

                                   ref="fileName"
                            />

                        </div>




                        <button type="submit" className="btn btn-primary TextAlign" disabled={!this.state.formValid} onClick={this.onSubmit}>Submit Assignment</button>
                    </form>


                </div>
            </div>
        );
    }
}

export default SubmitAssignment;