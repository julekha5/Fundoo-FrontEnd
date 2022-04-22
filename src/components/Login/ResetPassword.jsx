import React from 'react'
import { useState } from "react";
import '././LoginForm.css';
import '././LoginForm';
import { Link } from "react-router-dom";
import { UserService } from '../../services/UserService';
import { omit } from 'lodash';


function ResetPassword() {
    let userService = new UserService();

    const [inputs, setInputs] = useState({});
    //Errors
    const [errors, setErrors] = useState({});

    //password visibility
    const [passwordShown, setPasswordShown] = useState(false);
    
    const togglePassword = () => {

        setPasswordShown(!passwordShown);
      };

    const handleSubmit = (event) => {
        console.log("Inside Reset");
        event.preventDefault();

        var current_url = window.location.pathname;
        console.log(current_url);
        let token = current_url.split("/")[2];
        console.log("Extracted token is:" + token);

        if (Object.keys(errors).length === 0 && Object.keys(inputs).length !== 0) {

            userService.resetPassword(inputs, token) //calling forget password API
                .then((resp) => {
                    console.log(resp);
                    return resp;
                })
                .catch((error) => { console.log(error) })

            console.log(inputs);
            alert("password reset successfully...!");
            window.location.href = '/login';

        } else {
            alert("password not reset...!");
            // window.location.href = '/resetPassword/:token';

        }
    }

    const validate = (event, name, value) => {

        switch (name) {

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

            case 'confirm_password':
                if (
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)

                ) {
                    setErrors({
                        ...errors,
                        confirm_password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                } else {

                    let newObj = omit(errors, "confirm_password");
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
    }
    
    return (
        <>
            <div className="container">
                <div className="p-3 d-flex align-items-center justify-content-center">
                    <div className="card0">
                        <div className="card2">
                            <h4 className="heading">Reset Password Form</h4>
                            <hr></hr>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="email">Enter New Password:</label>
                                    <br></br>
                                    <input
                                       type={passwordShown ? "text" : "password"} 
                                       // type="password"
                                        name="password"
                                        value={inputs.password}
                                        onChange={handleOnChange}
                                        className="form-control"
                                        placeholder="Enter password"
                                        id="password"
                                       
                                    />
                                    <i className="bi bi-eye-slash" id="togglePassword"  onClick={togglePassword} ></i>

                                    <div>{
                                        errors.password && <h3 className="errors">{errors.password}</h3>
                                    }
                                    </div>
                                    <label for="email">Enter Confirm Password:</label>
                                    <br></br>
                                    <input
                                        type={passwordShown ? "text" : "password"} 
                                       // type="password"
                                        name="confirm_password"
                                        value={inputs.confirm_password}
                                        onChange={handleOnChange}
                                        className="form-control bi bi-eye-slash"
                                        placeholder="Enter confirm password"
                                        id="confirm_password"

                                    />
                                    <i className="bi bi-eye-slash" id="togglePassword"  onClick={togglePassword} ></i>

                                    <div>{
                                        errors.confirm_password && <h3 className="errors">{errors.confirm_password}</h3>
                                    }
                                    </div>
                                    <br></br>
                                    <div>
                                        <input className="btn btn-ultra-voilet reset-pwd" type="submit" />
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

export default ResetPassword