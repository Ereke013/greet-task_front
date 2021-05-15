import './App.css';
import Header from "./components/Headers/Header";
import {Router} from "@material-ui/icons";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/login/Login";
import HomePage from "./components/layout/HomePage";
import {connect} from "react-redux";

function App(props) {
    const {auth} = props;
    return (
        <div className="app">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Route path="/home">
                        {!auth.isLoggedIn ? (
                            // <h1 style={{ backgroundColor: "white", margin: "5% 10%" }}>
                            //   404 NOT FOUND
                            // </h1>
                            <Redirect push to="/" />
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
