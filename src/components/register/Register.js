import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {LoginAuthAction} from "../../redux/actions/AuthAction";
import "./Register.css";
import ErrorHandler from "../error/ErrorHandler";
import {FormControl, FormHelperText, Input, InputLabel, Select} from '@material-ui/core';
import axios from "axios";
import {Form} from "react-bootstrap";


function Register(props) {
    const {user, register} = props;
    const [newStudent, setNewStudent] = useState({
        firstName: "",
        lastName: "",
        ava_picture: "",
        email: "",
        age: 0,
        password: "",
        a_class_id: 0
    });
    const history = useHistory();
    const [classes, setClasses] = useState([]);

    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });

    return (
        <div>
            <div className="register">
                <div className="container d-flex">
                    <div className="sign-in-container py-5 m-auto border registeer">
                        <div className="sign-in-header">
                            <div className="text">Sign Up</div>
                            <p className="sign-in-intro">
                <span className="text-muted">
                  Already exist account In Our App ?{" "}
                </span>
                                <Link to="/login">
                                    <span className="text-danger font-weight-bold">Sign In</span>{" "}
                                </Link>
                            </p>
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();

                                // console.log("after, .....", newStudent);
                                axios.post("/register", newStudent);
                                // console.log("before, .....", newStudent);
                                history.push("/login");
                                // register(userRegister, history, setErrorHandler);
                            }}
                        >
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-6">
                                        <label>First Name[Имя]:</label>
                                        <input className="form-control" placeholder="First Name[Имя]..."
                                               value={newStudent.firstName} onChange={(e) => {
                                            setNewStudent({...newStudent, firstName: e.target.value})
                                        }} required="required"/>
                                    </div>
                                    <div className="col-6">
                                        <label>Last Name[Фамилия]:</label>
                                        <input className="form-control" placeholder="Last Name[Фамилия]..."
                                               value={newStudent.lastName} onChange={(e) => {
                                            setNewStudent({...newStudent, lastName: e.target.value})
                                        }} required={true}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-5">
                                        <label>Age[Возраст](6-17):</label>
                                        <input className="form-control" type="number" min="6" max="17" placeholder="Age[Возраст]..."
                                               value={newStudent.age} onChange={(e) => {
                                            setNewStudent({...newStudent, age: e.target.value})
                                        }} required={true}/>

                                    </div>
                                    <div className="col-7">
                                        <label>Ava Picture[photo url]:</label>
                                        <input className="form-control" placeholder="url object..."
                                               value={newStudent.ava_picture} onChange={(e) => {
                                            setNewStudent({...newStudent, ava_picture: e.target.value})
                                        }}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input className="form-control" type="email" placeholder="Email..."
                                       value={newStudent.email} onChange={(e) => {
                                    setNewStudent({...newStudent, email: e.target.value})
                                }} required={true}/>
                            </div>
                            <div className="form-group">
                                <label>Password[Пароль]:</label>
                                <input className="form-control" type="password"
                                       placeholder="Password[Пароль]..." value={newStudent.password}
                                       onChange={(e) => {
                                           setNewStudent({...newStudent, password: e.target.value})
                                       }} required={true}/>
                            </div>
                            <button type="submit" className="btn btn-success btn-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;