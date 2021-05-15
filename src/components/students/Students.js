import React, {useEffect, useState} from "react";
import './Students.css';
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
// import StudentsCard from "./studentsCard/StudentsCard";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";

function Students(){
    const [students, setStudents]=useState([]);
    const [classes, setClasses]=useState([]);

    const [newStudent, setNewStudent] = useState({
        firstName:"",
        lastName:"",
        ava_picture:"",
        email:"",
        age:0,
        password:"",
        a_class_id:0
    });


    const [isAdded, setIsAdded] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            let request = await axios.get("/api/allUsers");
            console.log("req");
            console.log(request);
            setStudents(request.data);
        }
        fetchData();
    },[isAdded])

    const createPupil = () => {
        console.log("new student");
        console.log(newStudent);
        axios.post("/api/addUsers", newStudent).then(res => {

            setIsAdded(!isAdded);
            setShow(false);
        });
        setNewStudent({
            firstName:"",
            lastName:"",
            ava_picture:"",
            email:"",
            age:0,
            password:"",
            a_class_id:0
        });
    }

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    async function handleShow() {
        let allU = await axios.get("/api/allClass");
        console.log("allP");
        console.log(allU.data);
        setClasses(allU.data);
        setShow(true);
    }

    // async function getUserById(id) {
    //     let request = {};
    //     await axios.get(requests.getUserToEdit + id).then((res) => {
    //         console.log("reqss");
    //         console.log(res.data);
    //         request = res.data;
    //     });
    //
    //     console.log("request")
    //     console.log(request)
    //     return request;
    // }

    return(
        <div className="students">

            <Button variant="primary"  onClick={handleShow}>
                + Add New Student
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true} className="backcolorBlack">
                    <Modal.Title>Add New Pupil</Modal.Title>
                </Modal.Header>
                <Modal.Body className="backcolorBlack">
                    <form>
                        <div className="form-group">
                            <label>First Name[Имя]:</label>
                            <input className="form-control" placeholder="First Name[Имя]..." value={newStudent.firstName} onChange={(e)=>{
                                setNewStudent({...newStudent, firstName: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Last Name[Фамилия]:</label>
                            <input className="form-control" placeholder="Last Name[Фамилия]..." value={newStudent.lastName} onChange={(e)=>{
                                setNewStudent({...newStudent, lastName: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Ava Picture[photo url]:</label>
                            <input className="form-control" placeholder="url object..." value={newStudent.ava_picture} onChange={(e)=>{
                                setNewStudent({...newStudent, ava_picture: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input className="form-control" type="email" placeholder="Email..." value={newStudent.email} onChange={(e)=>{
                                setNewStudent({...newStudent, email: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Age[Возраст](6-17):</label>
                            <input className="form-control" type="number" placeholder="Age[Возраст]..." value={newStudent.age} onChange={(e)=>{
                                setNewStudent({...newStudent, age: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Password[Пароль]:</label>
                            <input className="form-control" type="password" placeholder="Password[Пароль]..." value={newStudent.password} onChange={(e)=>{
                                setNewStudent({...newStudent, password: e.target.value})
                            }} />
                        </div>
                        <div className="form-group">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom"
                                            onChange={console.log("form group")}>
                                    <Form.Label>User Poster:</Form.Label>
                                    <Form.Control as="select" custom onChange={(e) => {
                                        console.log("e.target.value");
                                        console.log(e.target.value);
                                            setNewStudent({...newStudent, a_class_id: e.target.value});
                                            console.log(newStudent);
                                    }}>
                                        <option value={null} >--SELECT--</option>
                                        {classes.map((classs) => {
                                            return (
                                                <option key={classs.id} value={classs.id}>{classs.class_name}</option>
                                            );
                                        })}
                                        {/*<option>1</option>*/}

                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer className="backcolorBlack">
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={createPupil}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {console.log("keldi go")}
                {students.map((student)=>(
                    // <StudentsCard key={student.id} id={student.id} firstName={student.firstName} lastName={student.lastName} age={student.age} ava_picture={student.ava_picture} classNum={student.aclass.class_name} />

                    <div key={student.id} className="col-3 mt-3">
                        <Card style={{maxWidth:"100%"}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{height:140}}
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
                            <CardActions>
                                {/*<Button size="medium" color="primary" >*/}
                                {/*    Edit*/}
                                {/*</Button>*/}
                                <Button size="medium" color="danger" onClick={() => {
                                    console.log(student.id);
                                    let res = axios.delete("/api/deleteUser/" + student.id).then(ress => {
                                        setIsAdded(!isAdded);
                                    });
                                }}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Students;