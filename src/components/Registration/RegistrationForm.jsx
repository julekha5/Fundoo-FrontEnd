import React from 'react'
import { useEffect, useState } from "react";
import '././RegistrationForm.css';
import { Link } from "react-router-dom";
import { omit } from 'lodash';
import {UserService} from '../../services/UserService';

function RegistrationForm() {
    
    let userService = new UserService();

    const [inputs, setInputs] = useState({});

    //Errors
    const [errors, setErrors] = useState({});

    //A function to validate each input values
    const validate = (event, name, value) => {

        switch (name) {

            case 'fname':
                if (
                    !new RegExp(/^[A-Z]{1}[a-zA-Z]{2,}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        fname: 'Enter a valid name- First Letter Capital, min 3 letter alllowed'
                    })
                } else {

                    let newObj = omit(errors, "fname");
                    setErrors(newObj);

                }
                break;

            case 'username':
                if (value.length <= 4) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        username: 'Username atleast have 5 letters'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);

                }
                break;

            case 'email':
                if (
                    !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;

            case 'password':
                if (
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

            default:
                break;
        }

        console.log(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0 && Object.keys(inputs).length !== 0) {
         //   alert("Email: " + inputs.email + " , " + "Password:" + inputs.password);
         userService.register(inputs);//calling registerAPI 

            console.log(inputs);
        } else {
            alert("There is an Error!");
        }
    }

    const handleOnChange = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);

        setInputs({ ...inputs, [name]: val });
    }
  
    return (
        <>
            <div className="container register">
                <div className="p-3 d-flex align-items-center justify-content-center">
                    <div className="card0">
                        <div className="card2">
                            <h4 className="heading">REGISTRATION FORM</h4>
                            <hr></hr>

                            <div className="row">
                                <div className="col-lg-6">
                                    <form id="register" onSubmit={handleSubmit}>

                                        <div class="form-group">
                                            <label>FirstName:</label>
                                            <br></br>
                                            <input
                                                type="text"
                                                name="fname"
                                                value={inputs.fname}
                                                onChange={handleOnChange}
                                                className="form-control"
                                                placeholder="Enter fullname"
                                                id="fname"
                                            />
                                            <div>{
                                                errors.fname && <h3 className="errors">{errors.fname}</h3>
                                            }
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>UserName:</label>
                                            <br></br>
                                            <input
                                                type="text"
                                                name="username"
                                                value={inputs.mobile}
                                                onChange={handleOnChange}
                                                className="form-control"
                                                placeholder="Enter username"
                                                id="username"
                                            />
                                            <div>{
                                                errors.username && <h3 className="errors">{errors.username}</h3>
                                            }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <br></br>
                                            <input
                                                type="email"
                                                name="email"
                                                value={inputs.email}
                                                onChange={handleOnChange}
                                                className="form-control"
                                                placeholder="Enter email"
                                                id="email"
                                            />
                                            <div>{
                                                errors.email && <h3 className="errors">{errors.email}</h3>
                                            }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <br></br>
                                            <input
                                                type="password"
                                                name="password"
                                                value={inputs.password}
                                                onChange={handleOnChange}
                                                className="form-control"
                                                placeholder="Enter password"
                                                id="password"
                                            />
                                            <div>{
                                                errors.password && <h3 className="errors">{errors.password}</h3>
                                            }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input className="btn btn-primary" type="submit" />
                                        </div>
                                    </form>
                                    <div className="new-account">Don't have an account?<br></br>
                                        <Link to="/login">
                                            <button className='btn btn-sm btn-success'>LOGIN</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img className="image" src={require('../../images/signup-image.jpg')} alt="image2" />
                                    <h2>WELCOME...</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default RegistrationForm




