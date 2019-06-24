import React, {Component} from 'react';
import moment from 'moment';


class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            file : ""
        }
    }



    display = (e) =>{
        e.preventDefault();


        const data = new FormData()

        console.log(this.state.file)
        console.log(this.refs.name.value)
        data.append('file', this.state.file)
        data.append('name', this.refs.name.value)

        const options = {
            method: 'POST',
            body: data,
            // If you add this, upload won't work
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        delete options.headers['Content-Type'];

        fetch("http://localhost:5000/api/submission/file",options
        ).then( res => {
            return res.json()
        }).then( data => {
            console.log(data)


        }).catch(err => {
            console.log(err)
        })
    }

    getFile = (e) =>{
        e.preventDefault();
        console.log(e.target.files[0])
        this.setState({
            file : e.target.files[0]
        })


    }

    getDate = (e) => {
        e.preventDefault()
        console.log(this.refs.date.value)

    }

  render() {

    return (
        <div >
            <form >
                <input type="date" ref="date"/>
                {/*<input type ="file" name="file" onChange={this.getFile} />*/}
                <button onClick={this.getDate}  >upload</button>

            </form>
            <a href={`http://localhost:5000/api/submission/file/sample 2.pdf`}>sample 2.pdf</a>
        </div>
    );
  }


}

export default App;
