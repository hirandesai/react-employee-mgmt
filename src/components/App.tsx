import React, { useState } from 'react';
import NavContainer from "./Navbar/NavContainer";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from "react-redux";
import {Row, Col} from "react-bootstrap";
import EmployeeList from "./Employee/Index";
import AddEmployee from "./Employee/Add";
import ViewEmployee from "./Employee/View";
import DashboardPage from "./Dashboard/index";

function App() {
  let title="Employee Management";
  const [subTitle,setTitle] =useState("");
  
  const updateSubTitle =(title:string)=>{
    setTitle(title);
  }
  return (
<Route>
  <div className="Wrapper">
    <NavContainer />
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">        
          <div className="row mb-2">            
            <div className="col-sm-6">
              <h1 className="m-0">{subTitle}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>                
              </ol>
            </div>
          </div>
          <Row>
              <Col md={12}>
                <Switch>                    
                    <Route path="/employee/add">
                      <AddEmployee onSubTitleChange={updateSubTitle} />
                    </Route>
                    <Route path="/employee/:id">
                      <ViewEmployee onSubTitleChange={updateSubTitle} />
                    </Route> 
                    <Route path="/employee">
                      <EmployeeList onSubTitleChange={updateSubTitle} />
                    </Route>         
                    <Route path={["","/","/dashboard"]}>
                      <DashboardPage onSubTitleChange={updateSubTitle} />
                    </Route>
                  </Switch>
              </Col>
            </Row>
        </div>
      </div>
    </div>
  </div>
</Route>
  );
}

export default connect()(App);
