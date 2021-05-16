import React from "react";
import './HomePage.css';
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Students from "../students/Students";
import Classes from "../classes/Classes";
import ClassStudents from "../classes/ClassStudents";

function HomePage(){
    let {path, url} = useRouteMatch();
    return(
      <div className="homePage">
          <div className="container">
              <div className="row">
                  <div className="col-3 mt-5" >
                      <div className="home__leftside">
                          <div className="sidebar">
                              <Link to={`${path}/allstudents`} style={{textDecoration:"none"}} className="admin__link">All Pupils</Link>
                          </div>
                          <div className="sidebar">
                              <Link to={`${path}/allclass`} style={{textDecoration:"none"}} className="admin__link">All Classes</Link>
                          </div>
                      </div>

                  </div>
                  <div className="col-9 mt-5">
                      <div className="home__center">
                          <Switch>
                              <Route exact path={path}>
                                  <h2 style={{alignItems:"center", fontSize:"55px", padding:"10%"}}>Welcome to school page</h2>
                              </Route>

                              <Route exact path={`${path}/allclass`}>
                                  <Classes />
                              </Route>
                              <Route  path={`${path}/allclass/:id`}>

                                  <ClassStudents />
                              </Route>
                              <Route exact path={`${path}/allstudents`}>
                                  <Students />
                              </Route>
                          </Switch>

                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default HomePage;