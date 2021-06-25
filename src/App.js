import React , {useState} from 'react';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import './App.css';

class Dropdown extends React.Component{
    onChange = (e) =>{
        this.props.history.push(`/${e.target.value}`);

    };

    render(){
        return (
            <select onChange={this.onChange} >
                <option placeholder="Select Storage Medium">Select Storage Medium</option>
                <option value="database" >Database</option>
                <option value="filestorage">FileStorage</option>
            </select>
        );
    }
}

const Menu = withRouter(Dropdown);

function App(){
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState(0);
    const[accountno, setAccountno] = useState(0);
    const[branchname, setBranchname] = useState("");
    const[zipcode, setZipcode] = useState(0);
    const[age, setAge] = useState(0);

    const addCustomer = ()=>{
        Axios.post("http://localhost:3001/", {
            name: name,
            email: email,
            phone: phone,
            age: age,
            accountno: accountno,
            branchname: branchname,
            zipcode: zipcode
        }).then(()=>{
            console.log("Success");
        });
    };

    const download =()=>{
        axios({
            url: 'http://localhost:3001/',
            method: 'GET',
            responseType: 'blob',
        }).then((response)=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download','info.txt');
            document.body.appendChild(link);
            link.click();
        });
    } 


    // const handleSubmit = (event) =>{
    //     event.preventDefault();
    //     console.log(`
    //     FullName: ${name}
    //     Email: ${email}
    //     Age: ${age}
    //     PhoneNumber: ${phone}
    //     AccountNumber: ${accountno}
    //     BranchName: ${branchname}
    //     ZipCode:${zipcode}
    //     `);
    // };

    // const okSubmit = (event) =>{
    //     event.preventDefault();
    //     console.log(`
    //     AccountNumber: ${accountno}
    //     BranchName: ${branchname}
    //     ZipCode:${zipcode}
    //     `);
    // };

    return(
        <div>
            <center>
            <h1>Personal Details</h1>

            <label>FirstName: </label>
            <input 
            type="text"
            placeholder="Write FirstName"
            onChange={(event) =>{
                setName(event.target.value);
            }}
            />
            <label>Email: </label>
            <input 
            type="text"
            placeholder="Write Email"
            onChange={(event) =>{
                setEmail(event.target.value);
            }}
            />
            <label>PhoneNumber: </label>
            <input 
            type="text"
            placeholder="Write phonenumber"
            onChange={(event) =>{
                setPhone(event.target.value);
            }}
            />
            <label>Age: </label>
            <input 
            type="number"
            placeholder="Write Age"
            onChange={(event) =>{
                setAge(event.target.value);
            }}
            />
            <h1>Account Details</h1>

            <label>AccountNumber: </label>
            <input 
            type="text"
            placeholder="Write AccountNumber"
            onChange={(event) =>{
                setAccountno(event.target.value);
            }}
            />
            <label>Bank Branch: </label>
            <input 
            type="text"
            placeholder="Write Bank Branch"
            onChange={(event) =>{
                setBranchname(event.target.value);
            }}
            />
            <label>Zip Code: </label>
            <input 
            type="text"
            placeholder="Write ZipCode"
            onChange={(event) =>{
                setZipcode(event.target.value);
            }}
            />
            <br/><br/>
            
            <BrowserRouter>
            <Menu/>
            
            <div>
                <Route
                path="/database"
                render={() => (
                <button onClick={addCustomer}>Submit
                    </button>
                    )}
                    />
                    <Route
                path="/filestorage"
                render={() => (
                <button onClick={download}>Submit
                    </button>
                    )}
                    />
                    
                    
            </div>
            </BrowserRouter>
            </center>
        </div>
    );
}

export default App;