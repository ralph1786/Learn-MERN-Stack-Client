import React, { Component, Fragment } from "react";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  logoutHandler = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.logoutHandler} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
