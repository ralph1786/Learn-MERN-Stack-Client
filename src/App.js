import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ReminderContainer from "./containers/RemindersContainer";
import { Container } from "reactstrap";
import { loadUser } from "./store/actions/authActions";
import store from "./store/storeConfig";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import WelcomePage from "./containers/WelcomePage";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { token } = this.props.auth;
    return (
      <div className="App">
        <AppNavbar />
        <Switch>
          <Route
            path="/user"
            render={() =>
              token ? (
                <Container>
                  <ReminderContainer />
                </Container>
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/"
            render={() =>
              token ? (
                <Redirect to="/user" />
              ) : (
                <Container>
                  <WelcomePage />
                </Container>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(App));
