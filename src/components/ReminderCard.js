import React, { Fragment } from "react";
import { ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { deleteReminder, updateReminder } from "../store/actions/actions";
import "./ReminderCard.css";

const ReminderCard = props => {
  console.log(props);
  const { _id, title, completed } = props.info;

  function changeComplete(completed, id) {
    let newCompleted = !completed;
    console.log(newCompleted, id);
    props.updateReminder(newCompleted, id);
  }

  return (
    <Fragment>
      <ListGroupItem className={completed ? "completed" : null}>
        <Button
          className="mr-2"
          color="danger"
          size="sm"
          onClick={props.deleteReminder.bind(this, _id)}
        >
          X
        </Button>
        <span onClick={() => changeComplete(completed, _id)}>{title}</span>
      </ListGroupItem>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteReminder: id => dispatch(deleteReminder(id)),
  updateReminder: (completed, id) => dispatch(updateReminder(completed, id))
});

export default connect(
  null,
  mapDispatchToProps
)(ReminderCard);
