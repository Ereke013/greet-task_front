import React from "react";
import './HomePage.css';
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Students from "../students/Students";

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
                                  <h1 style={{textAlign:"center", paddingTop:"10%", paddingBottom:"10%"}}>Welcome to admin page</h1>
                              </Route>
                              <Route exact path={`${path}/allstudents`}>
                                  <Students />
                              </Route>
                              <Route path={`${path}/users/:id`}>
                                  {/*<Edit_Users_Admin />*/}
                              </Route>
                              <Route exact path={`${path}/allclass`}>
                                  {/*<News_Admin />*/}
                              </Route>
                              <Route exact path={`${path}/friends`}>
                                  {/*<Friends_Admin />*/}
                              </Route>
                              <Route exact path={`${path}/messages`}>
                                  {/*<Messages_Admin />*/}
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