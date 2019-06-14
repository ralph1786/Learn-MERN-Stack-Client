import React, { Fragment } from "react";
import { ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { deleteReminder, updateReminder } from "../store/actions/actions";
import "./ReminderCard.css";

const ReminderCard = props => {
  console.log(props.info);
  const { _id, title, completed, author } = props.info;

  function changeComplete(completed, id, author) {
    let newCompleted = !completed;
    props.updateReminder(newCompleted, id, author);
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
        <span onClick={() => changeComplete(completed, _id, author)}>
          {title}
        </span>
      </ListGroupItem>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteReminder: id => dispatch(deleteReminder(id)),
  updateReminder: (completed, id, author) =>
    dispatch(updateReminder(completed, id, author))
});

export default connect(
  null,
  mapDispatchToProps
)(ReminderCard);
