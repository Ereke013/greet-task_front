import React from "react";
import {LogOutAuthAction} from "../../redux/actions/AuthAction";
import {connect} from "react-redux";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import './Header.css';

function Header(props) {
    const {auth, logout, errorHandler} = props;
    const history = useHistory();
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
                                        <Link to="/home/allstudents" className="navlink">
                                            All students
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/home/allclass" className="navlink">
                                            All class
                                        </Link>
                                    </Nav.Link>

                                </Nav>
                                <Nav className="leftside">
                                    <Nav.Link>
                                        {auth.user.firstName} {auth.user.lastName}
                                    </Nav.Link>
                                    <Nav.Link onClick={() => {
                                        logout();
                                    }}>
                                        Logout  <span className="sr-only">(current)</span>
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