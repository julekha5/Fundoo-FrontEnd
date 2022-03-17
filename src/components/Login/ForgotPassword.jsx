import React from 'react'
import { useState } from "react";
import '././LoginForm.css';
import '././LoginForm';
import { UserService } from '../../services/UserService';
import { omit } from 'lodash';
import '././ResetPassword';
//import { Link } from "react-router-dom";

function ForgotPassword() {

    let userService = new UserService();

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

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

            default:
                break;
        }
    }

    const handleOnChange = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);

        setInputs({ ...inputs, [name]: val });
        // console.log();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0 && Object.keys(inputs).length !== 0) {

            userService.forgotPassword(inputs) //calling forget password API
                .then((resp) => {
                    console.log(resp);
                })
                .catch((error) => { console.log(error) })


            console.log(inputs);
        } else {
            alert("User account not found...!");
        }
    }

    return (
        <>
            <div className="container">

                <div className="p-3 d-flex align-items-center justify-content-center">
                    <div className="card0">
                        <div className="card2">
                            <h4 className="heading">Forgot Password Form</h4>
                            <hr></hr>
                            <form id="forgotPasswordForm" onSubmit={handleSubmit} >
                                <div className="form-group">
                                    <label for="email">Email-Id:</label>
                                    <br></br>
                                    <input
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        onChange={handleOnChange}
                                        className="form-control"
                                        placeholder="Enter email-id for recover your account"
                                        id="email"
                                        required
                                    />
                                    <div>{
                                        errors.email && <h3 className="errors">{errors.email}</h3>
                                    }
                                    </div>
                                    <br></br>
                                    <div>
                                        <input className="btn btn-ultra-voilet" type="submit" />
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgotPassword