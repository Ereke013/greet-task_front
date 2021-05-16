import './App.css';
import Header from "./components/Headers/Header";
import {Router} from "@material-ui/icons";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/login/Login";
import HomePage from "./components/layout/HomePage";
import {connect} from "react-redux";
import Welcome from "./components/welcome/Welcome";
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.min.css';
import Register from "./components/register/Register";

function App(props) {
    const {auth} = props;
    return (
        <div className="app">

                <BrowserRouter>
                    <Header/>
                    <Switch>

                        <Route exact path="/">
                            {
                                auth.isLoggedIn?
                                    <Redirect push to="/home"/>
                                    :
                                    <Welcome/>
                            }

                        </Route>
                        <Route path="/login">
                            {
                                auth.isLoggedIn?
                                    <Redirect push to="/home"/>
                                    :
                                    <Login/>
                            }

                        </Route>
                        <Route path="/register">
                            {
                                auth.isLoggedIn?
                                    <Redirect push to="/home"/>
                                    :
                                    <Register/>
                            }

                        </Route>
                        <Route path="/home">
                            {!auth.isLoggedIn ? (
                                // <h1 style={{ backgroundColor: "white", margin: "5% 10%" }}>
                                //   404 NOT FOUND
                                // </h1>
                                <Redirect push to="/"/>
                            ) : (
                                <HomePage/>
                            )}
                        </Route>
                    </Switch>
                </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};
export default connect(mapStateToProps)(App);
