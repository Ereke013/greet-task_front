import React, {useEffect, useState} from "react";
import './ClassStudents.css';
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
// import StudentsCard from "./studentsCard/StudentsCard";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {ClipLoader, RingLoader} from "react-spinners";
import {useParams} from "react-router-dom";
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
        a_class_id: id
    });


    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [isAdded])

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get("/api/usersbyClass/" + id);

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
            a_class_id: id
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


    return (
        <div className="students">

            {
                loading ?
                    <div className="spinnerLoad">
                        <RingLoader color={'#4A4A4A'} loading={loading} size={150}/>
                    </div>
                    :
                    <>
                        <h2 style={{textAlign: "center"}}>Students of this class</h2>
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
                                        <input className="form-control" required={true} type="email"
                                               placeholder="Email..."
                                               value={newStudent.email} onChange={(e) => {
                                            setNewStudent({...newStudent, email: e.target.value})
                                        }}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Age[Возраст](6-17):</label>
                                        <input className="form-control" min="6" max="17" type="number"
                                               placeholder="Age[Возраст]..."
                                               value={newStudent.age} onChange={(e) => {
                                            setNewStudent({...newStudent, age: e.target.value})
                                        }} required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password[Пароль]:</label>
                                        <input className="form-control" required type="password"
                                               placeholder="Password[Пароль]..." value={newStudent.password}
                                               onChange={(e) => {
                                                   setNewStudent({...newStudent, password: e.target.value})
                                               }}/>
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

                            {
                                students.length > 0 ?
                                    students.map((student) => (
                                        // <StudentsCard key={student.id} id={student.id} firstName={student.firstName} lastName={student.lastName} age={student.age} ava_picture={student.ava_picture} classNum={student.aclass.class_name} />

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
                                    ))
                                    :
                                    <h2 className="mt-3" style={{marginLeft: "40%"}}>No pupils</h2>

                            }
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