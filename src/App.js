import './App.css';
import Header from "./components/Headers/Header";
import {Router} from "@material-ui/icons";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/login/Login";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
