import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ReminderContainer from "./containers/RemindersContainer";
import ReminderModal from "./components/ReminderModal";
import { Container } from "reactstrap";
import { loadUser } from "./store/actions/authActions";
import store from "./store/storeConfig";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <ReminderModal />
          <ReminderContainer />
        </Container>
      </div>
    );
  }
}

export default App;
