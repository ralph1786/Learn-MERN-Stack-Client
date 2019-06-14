import React, { Component, Fragment } from "react";
import ReminderCard from "../components/ReminderCard";
import { Container, ListGroup } from "reactstrap";
import { connect } from "react-redux";
import { fetchAllReminder } from "../store/actions/actions";
import PropTypes from "prop-types";
import ReminderModal from "../components/ReminderModal";

class RemindersContainer extends Component {
  componentDidMount() {
    this.props.fetchAllReminder();
  }

  static propTypes = {
    fetchAllReminder: PropTypes.func.isRequired,
    reminders: PropTypes.array.isRequired
  };

  render() {
    // console.log(this.props.reminders);
    const listOfReminders = this.props.reminders.map(reminder => (
      <ReminderCard key={reminder._id} info={reminder} />
    ));
    return (
      <Fragment>
        <Container>
          <ReminderModal />
        </Container>
        <Container>
          <ListGroup>{listOfReminders}</ListGroup>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state.reminders.reminders,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchAllReminder: () => dispatch(fetchAllReminder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindersContainer);
