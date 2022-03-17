import React from 'react'
import { useEffect, useState } from "react";
import '././LoginForm.css';
import { Link } from "react-router-dom";
import { omit } from 'lodash';
import { UserService } from '../../services/UserService';
import '././ForgotPassword';

function LoginForm() {

    let userService = new UserService();

    const [inputs, setInputs] = useState({});

    //Errors
    const [errors, setErrors] = useState({});

    //A function to validate each input values
    const validate = (event, name, value) => {

        switch (name) {

            case 'email':
                if (
                    !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
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

        // console.log(name, value);
    }

    const handleOnChange = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);

        setInputs({ ...inputs, [name]: val });
        console.log();
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length === 0 && Object.keys(inputs).length !== 0) {
          userService.login(inputs)    //calling login API 
                        .then((resp) => {
                            console.log(resp)
                        //localStorage.setItem('token', resp.data.id);
                })
                .catch((error) => { console.log(error) })

                console.log(inputs);
        } else {
            alert("There is an Error!");
        }
    }

  
    return (
        <>
            <div className="container login">

                <div className="p-3 d-flex align-items-center justify-content-center">
                    <div className="card0">
                        <div className="card2">
                            <h4 className="heading">LOGIN FORM</h4>
                            <hr></hr>
                            <div className="row">
                                <div className="col-lg-6">
                                    <img className="image" src={require('../../images/signin-image.jpg')} alt="image1" />
                                    <h2>Hello User...</h2>
                                </div>
                                <div className="col-lg-6">

                                    <form id="loginForm" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="email">Email-Id:</label>
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
                                            <label for="password">Password:</label>
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
                                            <div>
                                                {
                                                    errors.password && <h3 className="errors">{errors.password}</h3>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <Link className="forgot-pwd" to="/forgotPassword" >Forgot Password</Link>
                                        </div>
                                        <input className="btn btn-ultra-voilet" type="submit" />
                                    </form>
                                    <div className="new-account">Don't have an account?<br></br>
                                        <Link to="/registration">
                                            <button className='btn btn-sm btn-ultra-green' >REGISTER HERE</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LoginForm


