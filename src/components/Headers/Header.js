import React from "react";
import {LogOutAuthAction} from "../../redux/actions/AuthAction";
import {connect} from "react-redux";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import './Header.css';

function Header(props) {
    const {auth, logout, errorHandler} = props;
    const history = useHistory();
    console.log(auth);
    return (
        <div className="headerr">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container" style={{position:"relative"}}>
                    <Navbar.Brand>
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>
                            School Task
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {auth.isLoggedIn ?
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link>
                                        <Link to="/students" className="navlink">
                                            All students
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/classes" className="navlink">
                                            All class
                                        </Link>
                                    </Nav.Link>

                                </Nav>
                                <Nav className="leftside">
                                    <Nav.Link>
                                        <Link to="/admin" className="navlink">
                                            Admin
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        Yerlan Yerzhansa
                                    </Nav.Link>
                                </Nav>
                            </>
                            :
                            <>
                                <Nav className="leftside">
                                    <Nav.Link>
                                        <Link to="/login" className="navlink">
                                            Login
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/register" className="navlink">
                                            Register
                                        </Link>
                                    </Nav.Link>
                                </Nav>
                            </>
                        }

                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {
            dispatch(LogOutAuthAction());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);