import React, {useEffect, useState} from "react";
import axios from "axios";
import {RingLoader} from "react-spinners";
import {Button, Form, Modal} from "react-bootstrap";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import './Classes.css';
import {Link, useRouteMatch} from "react-router-dom";
import {connect} from "react-redux";

function Classes({auth}) {
    let authh = auth;
    const [classes, setClasses] = useState([]);
    let {path, url} = useRouteMatch();
    const [loading, setLoading] = useState(true);

    const [newClass, setNewClass] = useState("");


    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }, [isAdded])

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get("/api/allClass");
            // console.log("req");
            // console.log(request);
            setClasses(request.data);
        }

        fetchData();
    }, [isAdded])

    const createClass = () => {
        // console.log("new class");
        // console.log(newClass);
        setShow(false);
        axios.post("/api/addClass?class_name=" + newClass).then(res => {

            setIsAdded(!isAdded);

        });
        setNewClass("");
    }

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    async function handleShow() {
        setShow(true);
    }

    return (
        <div className="classes">

            {
                loading ?
                    <div className="spinnerLoad">
                        <RingLoader color={'#4A4A4A'} loading={loading} size={150}/>
                    </div>
                    :
                    <>
                        {
                            authh?.user.roles.find(o => o.role === 'ROLE_ADMIN')?
                                <>
                                    <Button variant="primary" onClick={handleShow}>
                                        + Add New Class
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton={true} className="backcolorBlack">
                                            <Modal.Title>Add New Class</Modal.Title>
                                        </Modal.Header>
                                        <form onSubmit={(e)=>{
                                            e.preventDefault();
                                            createClass();
                                        }}>
                                            <Modal.Body className="backcolorBlack">

                                                <div className="form-group">
                                                    <label>Class Name[Номер и символ класса]:</label>
                                                    <input className="form-control" placeholder="например, 10А ..." value={newClass}
                                                           onChange={(e) => {
                                                               setNewClass(e.target.value)
                                                           }} required="required"/>
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
                                </>
                                :
                                <></>
                        }

                        <div className="row">
                            {console.log("keldi go")}
                            {classes.map((classs) => (
                                <div key={classs.id} className="col-3 mt-3">
                                    <Card style={{maxWidth: "100%"}}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    {classs.class_name} Class
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions>
                                            <Link className="btn btn-primary" to={`${path}/${classs.id}`}>
                                                More...
                                            </Link>
                                        </CardActions>


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


export default connect(mapStateToProps)(Classes);