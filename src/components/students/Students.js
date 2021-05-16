import React, {useEffect, useState} from "react";
import './Students.css';
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
// import StudentsCard from "./studentsCard/StudentsCard";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {ClipLoader, RingLoader} from "react-spinners";
import {useParams} from "react-router-dom";
import {LogOutAuthAction} from "../../redux/actions/AuthAction";
import {connect} from "react-redux";

function Students({auth}) {
    const authh = auth;
    let {id} = useParams();
    // console.log("cl_id");
    // console.log(id);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [newStudent, setNewStudent] = useState({
        firstName: "",
        lastName: "",
        ava_picture: "",
        email: "",
        age: 0,
        password: "",
        a_class_id: 0
    });


    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            {setLoading(false)}
        }, 3000);
    }, [isAdded])

    useEffect(() => {
        async function fetchData() {
            let request
            if (id != null) {
                request = await axios.get("/api/usersbyClass/" + id);
            } else {
                request = await axios.get("/api/allUsers");
            }
            // console.log("req");
            // console.log(request);
            setStudents(request.data);
        }

        fetchData();
    }, [isAdded])

    const createPupil = () => {
        // console.log("new student");
        // console.log(newStudent);
        setShow(false);
        axios.post("/api/addUsers", newStudent).then(res => {

            setIsAdded(!isAdded);

        });
        setNewStudent({
            firstName: "",
            lastName: "",
            ava_picture: "",
            email: "",
            age: 0,
            password: "",
            a_class_id: 0
        });
    }

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    async function handleShow() {
        let allU = await axios.get("/api/allClass");
        // console.log("allP");
        // console.log(allU.data);
        setClasses(allU.data);
        setShow(true);
    }

    function checkAdminRoles() {
        let userget = localStorage.getItem("auth");
        // console.log("user");
        const user = JSON.parse(userget);
        // console.log(user.user.roles);
        const roles = user.user.roles;
        roles.map((role) => {
            // console.log("role");
            // console.log(role.role);
            if (role.role === "ROLE_ADMIN") {
                // console.log("true");
                return true;
            }
        })
        return false;
    }

    return (
        <div className="students">

            {
                loading ?
                    <div className="spinnerLoad">
                        <RingLoader color={'#4A4A4A'} loading={loading} size={150}/>
                    </div>
                    :
                    <>
                        <Button variant="primary" onClick={handleShow}>
                            + Add New Student
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton={true} className="backcolorBlack">
                                <Modal.Title>Add New Pupil</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={(e)=>{
                                e.preventDefault();
                                createPupil();
                            }}>
                                <Modal.Body className="backcolorBlack">

                                    <div className="form-group">
                                        <label>First Name[Имя]:</label>
                                        <input className="form-control" placeholder="First Name[Имя]..."
                                               value={newStudent.firstName} onChange={(e) => {
                                            setNewStudent({...newStudent, firstName: e.target.value})
                                        }} required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name[Фамилия]:</label>
                                        <input className="form-control" placeholder="Last Name[Фамилия]..."
                                               value={newStudent.lastName} onChange={(e) => {
                                            setNewStudent({...newStudent, lastName: e.target.value})
                                        }} required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Ava Picture[photo url]:</label>
                                        <input className="form-control" placeholder="url object..."
                                               value={newStudent.ava_picture} onChange={(e) => {
                                            setNewStudent({...newStudent, ava_picture: e.target.value})
                                        }}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" type="email" placeholder="Email..."
                                               value={newStudent.email} onChange={(e) => {
                                            setNewStudent({...newStudent, email: e.target.value})
                                        }} required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Age[Возраст](6-17):</label>
                                        <input className="form-control" type="number" min="6" max="17"
                                               placeholder="Age[Возраст]..."
                                               value={newStudent.age} onChange={(e) => {
                                            setNewStudent({...newStudent, age: e.target.value})
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

                                    <div className="form-group">
                                        <Form>
                                            <Form.Group controlId="exampleForm.SelectCustom"
                                                        onChange={console.log("form group")}>
                                                <Form.Label>Class:</Form.Label>
                                                <Form.Control as="select" custom onChange={(e) => {
                                                    // console.log("e.target.value");
                                                    // console.log(e.target.value);
                                                    setNewStudent({...newStudent, a_class_id: e.target.value});
                                                    // console.log(newStudent);
                                                }}>
                                                    <option value={null}>--SELECT--</option>
                                                    {classes.map((classs) => {
                                                        return (
                                                            <option key={classs.id}
                                                                    value={classs.id}>{classs.class_name}</option>
                                                        );
                                                    })}
                                                    {/*<option>1</option>*/}

                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </div>


                                </Modal.Body>
                                <Modal.Footer className="backcolorBlack">
                                    <Button variant="danger" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Create
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                        <div className="row">
                            {/*{console.log("keldi go")}*/}

                            {students.map((student) => (
                                student.roles.find(o => o.role === 'ROLE_ADMIN') ?
                                    <></>
                                    :
                                    <div key={student.id} className="col-3 mt-3">
                                        <Card style={{maxWidth: "100%"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{height: 140}}
                                                    image={student.ava_picture}
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="h2">
                                                        {student.firstName} {student.lastName}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {student.aclass.class_name} class, age: {student.age}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            {
                                                authh?.user.roles.find(o => o.role === 'ROLE_ADMIN') ?
                                                    <CardActions>
                                                        <Button size="medium" color="danger" onClick={() => {
                                                            // console.log(student.id);
                                                            let res = axios.delete("/api/deleteUser/" + student.id).then(ress => {
                                                                setIsAdded(!isAdded);
                                                            });
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </CardActions>
                                                    :
                                                    ''
                                            }

                                        </Card>
                                    </div>
                            ))}
                        </div>
                    </>

            }

        </div>
    );
}

const mapStateToProps = (state) =>
{
    return {
        auth: state.authState,
    };
}
;


export default connect(mapStateToProps)(Students);