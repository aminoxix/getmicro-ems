import React, { Component } from "react";
import "./DashboardAdmin.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import Country from "../Country.jsx";
import State from "../State.jsx";
import City from "../City.jsx";
import Company from "../Company.jsx";
import Employee from "../Employee.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "../hr/LeaveApplicationHR.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks,
  faUser,
  faRupeeSign,
  faFileAlt,
  faCity,
  faGlobeAmericas,
  faPlaceOfWorship,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";

function RoleAdminF() {
  return <Role />;
}

function PositionF() {
  return <Position />;
}
function RoleFormF() {
  return <RoleForm />;
}

function DepartmentF() {
  return <Department />;
}

function CountryF() {
  return <Country />;
}

function StateF() {
  return <State />;
}

function CityF() {
  return <City />;
}

function CompanyF() {
  return <Company />;
}

function EmployeeF() {
  return <Employee />;
}

function SalaryF() {
  return <Salary />;
}

function LeaveApplicationHRF() {
  return <LeaveApplicationHR />;
}

function AdminPortalF() {
  return <AdminPortal />;
}

function AdminProjectBidF() {
  return <AdminProjectBid />;
}

class DashboardAdmin extends Component {
  state = {
    redirect: true,
    checked: true,
  };
  handleChange = (checked) => {
    console.log("switch");
    // var sidebarV = this.refs.sidebar;
    // var sidebarV = React.findDOMNode( this.refs.sidebar);
    // sidebarV.style.disply="none";

    if (this.state.checked == true) {
      // document.getElementById("sidebar").setAttribute("style", "display:none")
      document.getElementById("sidebar").setAttribute("class", "display-none");
    }
    // document.getElementById("sidebar").setAttribute("style", "display:block");
    else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  render() {
    return (
      <Router>
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/employee">
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    User
                  </Link>
                </li>
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Role
                  </Link>
                </li>
                <li>
                  <Link to="/admin/country">
                    <FontAwesomeIcon
                      icon={faGlobeAmericas}
                      className="sidebar-icon"
                    />
                    Country
                  </Link>
                </li>
                <li>
                  <Link to="/admin/state">
                    <FontAwesomeIcon
                      icon={faPlaceOfWorship}
                      className="sidebar-icon"
                    />
                    State
                  </Link>
                </li>
                <li>
                  <Link to="/admin/city">
                    <FontAwesomeIcon
                      icon={faArchway}
                      className="sidebar-icon"
                    />
                    City
                  </Link>
                </li>
                <li>
                  <Link to="/admin/company">
                    <FontAwesomeIcon icon={faCity} className="sidebar-icon" />
                    company
                  </Link>
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    Department
                  </Link>
                </li>
                <li>
                  <Link to="/admin/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" />
                    Position
                  </Link>
                </li>
                <li>
                  <Link to="/admin/salary">
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      className="sidebar-icon"
                    />
                    Salary
                  </Link>
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    Project Bidding
                  </Link>
                </li>
                <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                    Portal Master
                  </Link>
                </li>
                <li>
                  <Link to="/admin/leave-application-admin">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Leave Application
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* //table */}
              {/* <RoleAdmin/> */}
              <Switch>
                <Route exact path="/admin/role" component={RoleAdminF} />
                {/* <Route path="/admin/role/form" exact component={RoleFormF} /> */}
                <Route path="/admin/position" exact component={PositionF} />
                <Route path="/admin/department" exact component={DepartmentF} />
                <Route path="/admin/salary" exact component={SalaryF} />
                <Route path="/admin/company" exact component={CompanyF} />
                <Route path="/admin/country" exact component={CountryF} />
                <Route path="/admin/state" exact component={StateF} />
                <Route path="/admin/city" exact component={CityF} />
                <Route
                  path="/admin/leave-application-admin"
                  exact
                  component={LeaveApplicationHRF}
                />

                <Route
                  path="/admin/portal-master"
                  exact
                  component={AdminPortalF}
                />
                <Route
                  path="/admin/project-bid"
                  exact
                  component={AdminProjectBidF}
                />
                {/* <Route
                  exact
                  path="/admin"
                  render={() => <Redirect to="/admin/role" />}
                /> */}
                <Route
                  render={
                    () => <NotFound404 />
                    // <Redirect to="/admin/role" />
                  }
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardAdmin;
